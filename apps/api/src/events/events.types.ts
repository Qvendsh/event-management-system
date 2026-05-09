import { EventCategory } from '@prisma/client';
import { EVENT_SORT_FIELDS, EVENT_SORT_ORDERS } from './events.constants';

export type EventSortBy = (typeof EVENT_SORT_FIELDS)[number];

export type SortOrder = (typeof EVENT_SORT_ORDERS)[number];

export type FindAllEventsParams = {
    category?: EventCategory;
    dateFrom?: Date;
    dateTo?: Date;
    sortBy?: EventSortBy;
    order?: SortOrder;
};

export type CreateEventData = {
    title: string;
    description: string;
    date: Date;
    location: string;
    category: EventCategory;
    latitude?: number;
    longitude?: number;
};

export type UpdateEventData = Partial<CreateEventData>;