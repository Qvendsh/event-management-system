import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { Event } from '@prisma/client';
import { CreateEventDto } from './dto/create-event.dto';
import { GetEventsQueryDto } from './dto/get-events-query.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import {
    RECOMMENDATION_CANDIDATES_LIMIT,
    RECOMMENDATION_LIMIT,
    RECOMMENDATION_MAX_DATE_DISTANCE_DAYS,
    RECOMMENDATION_SCORES,
} from './events.constants';
import { EventsRepository } from './events.repository';
import { RecommendedEvent } from './events.types';

@Injectable()
export class EventsService {
    constructor(private readonly eventsRepository: EventsRepository) {}

    async create(dto: CreateEventDto): Promise<Event> {
        return this.eventsRepository.create({
            title: dto.title,
            description: dto.description,
            date: new Date(dto.date),
            location: dto.location,
            category: dto.category,
            latitude: dto.latitude,
            longitude: dto.longitude,
        });
    }

    async findAll(query: GetEventsQueryDto): Promise<Event[]> {
        const dateFrom = query.dateFrom ? new Date(query.dateFrom) : undefined;
        const dateTo = query.dateTo ? new Date(query.dateTo) : undefined;

        if (dateFrom && dateTo && dateFrom > dateTo) {
            throw new BadRequestException('dateFrom cannot be later than dateTo');
        }

        return this.eventsRepository.findAll({
            category: query.category,
            dateFrom,
            dateTo,
            sortBy: query.sortBy,
            order: query.order,
        });
    }

    async findOne(id: number): Promise<Event> {
        const event = await this.eventsRepository.findById(id);

        if (!event) {
            throw new NotFoundException(`Event with id ${id} not found`);
        }

        return event;
    }

    async findRecommendations(id: number): Promise<RecommendedEvent[]> {
        const currentEvent = await this.findOne(id);

        const dateFrom = this.addDays(
            currentEvent.date,
            -RECOMMENDATION_MAX_DATE_DISTANCE_DAYS,
        );

        const dateTo = this.addDays(
            currentEvent.date,
            RECOMMENDATION_MAX_DATE_DISTANCE_DAYS,
        );

        const candidates = await this.eventsRepository.findRecommendationCandidates({
            eventId: currentEvent.id,
            category: currentEvent.category,
            location: currentEvent.location,
            dateFrom,
            dateTo,
            limit: RECOMMENDATION_CANDIDATES_LIMIT,
        });

        return candidates
            .map((candidate) => {
                const { score, reasons } = this.calculateRecommendationScore(
                    currentEvent,
                    candidate,
                );

                return {
                    ...candidate,
                    recommendationScore: score,
                    recommendationReasons: reasons,
                };
            })
            .filter((event) => event.recommendationScore > 0)
            .sort((a, b) => {
                if (b.recommendationScore !== a.recommendationScore) {
                    return b.recommendationScore - a.recommendationScore;
                }

                return a.date.getTime() - b.date.getTime();
            })
            .slice(0, RECOMMENDATION_LIMIT);
    }

    async update(id: number, dto: UpdateEventDto): Promise<Event> {
        await this.findOne(id);

        if (Object.keys(dto).length === 0) {
            throw new BadRequestException('At least one field must be provided');
        }

        return this.eventsRepository.update(id, {
            ...(dto.title !== undefined && { title: dto.title }),
            ...(dto.description !== undefined && { description: dto.description }),
            ...(dto.date !== undefined && { date: new Date(dto.date) }),
            ...(dto.location !== undefined && { location: dto.location }),
            ...(dto.category !== undefined && { category: dto.category }),
            ...(dto.latitude !== undefined && { latitude: dto.latitude }),
            ...(dto.longitude !== undefined && { longitude: dto.longitude }),
        });
    }

    async remove(id: number): Promise<void> {
        await this.findOne(id);

        await this.eventsRepository.delete(id);
    }

    private calculateRecommendationScore(
        currentEvent: Event,
        candidate: Event,
    ): { score: number; reasons: string[] } {
        let score = 0;
        const reasons: string[] = [];

        if (candidate.category === currentEvent.category) {
            score += RECOMMENDATION_SCORES.SAME_CATEGORY;
            reasons.push('Same category');
        }

        if (
            this.normalizeText(candidate.location) ===
            this.normalizeText(currentEvent.location)
        ) {
            score += RECOMMENDATION_SCORES.SAME_LOCATION;
            reasons.push('Same location');
        }

        const daysDifference = this.getDaysDifference(
            currentEvent.date,
            candidate.date,
        );

        if (daysDifference <= 7) {
            score += RECOMMENDATION_SCORES.DATE_WITHIN_7_DAYS;
            reasons.push('Date within 7 days');
        } else if (daysDifference <= 30) {
            score += RECOMMENDATION_SCORES.DATE_WITHIN_30_DAYS;
            reasons.push('Date within 30 days');
        }

        return {
            score,
            reasons,
        };
    }

    private getDaysDifference(firstDate: Date, secondDate: Date): number {
        const millisecondsPerDay = 1000 * 60 * 60 * 24;
        const difference = Math.abs(firstDate.getTime() - secondDate.getTime());

        return Math.floor(difference / millisecondsPerDay);
    }

    private addDays(date: Date, days: number): Date {
        const result = new Date(date);
        result.setDate(result.getDate() + days);

        return result;
    }

    private normalizeText(value: string): string {
        return value.trim().toLowerCase();
    }
}