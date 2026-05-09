import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { Event } from '@prisma/client';
import { CreateEventDto } from './dto/create-event.dto';
import { GetEventsQueryDto } from './dto/get-events-query.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventsRepository } from './events.repository';

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
}