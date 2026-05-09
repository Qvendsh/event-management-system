import { Injectable } from '@nestjs/common';
import { Event, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
    DEFAULT_EVENTS_ORDER,
    DEFAULT_EVENTS_SORT_BY,
} from './events.constants';
import {
    CreateEventData,
    FindAllEventsParams,
    UpdateEventData,
} from './events.types';

@Injectable()
export class EventsRepository {
    constructor(private readonly prisma: PrismaService) {}

    create(data: CreateEventData): Promise<Event> {
        return this.prisma.event.create({
            data,
        });
    }

    findAll(params: FindAllEventsParams): Promise<Event[]> {
        const {
            category,
            dateFrom,
            dateTo,
            sortBy = DEFAULT_EVENTS_SORT_BY,
            order = DEFAULT_EVENTS_ORDER,
        } = params;

        const where: Prisma.EventWhereInput = {
            ...(category && { category }),
            ...((dateFrom || dateTo) && {
                date: {
                    ...(dateFrom && { gte: dateFrom }),
                    ...(dateTo && { lte: dateTo }),
                },
            }),
        };

        const orderBy: Prisma.EventOrderByWithRelationInput = {
            [sortBy]: order,
        };

        return this.prisma.event.findMany({
            where,
            orderBy,
        });
    }

    findById(id: number): Promise<Event | null> {
        return this.prisma.event.findUnique({
            where: { id },
        });
    }

    update(id: number, data: UpdateEventData): Promise<Event> {
        return this.prisma.event.update({
            where: { id },
            data,
        });
    }

    delete(id: number): Promise<Event> {
        return this.prisma.event.delete({
            where: { id },
        });
    }
}