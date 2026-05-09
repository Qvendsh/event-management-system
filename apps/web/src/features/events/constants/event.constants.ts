import { EventCategory, EventSortBy, SortOrder } from '../types/event.types';

export const EVENT_CATEGORIES: EventCategory[] = [
    'CONFERENCE',
    'WORKSHOP',
    'MEETUP',
    'CONCERT',
    'SPORT',
    'OTHER',
];

export const EVENT_CATEGORY_LABELS: Record<EventCategory, string> = {
    CONFERENCE: 'Conference',
    WORKSHOP: 'Workshop',
    MEETUP: 'Meetup',
    CONCERT: 'Concert',
    SPORT: 'Sport',
    OTHER: 'Other',
};

export const EVENT_SORT_FIELDS: EventSortBy[] = [
    'date',
    'createdAt',
    'title',
    'category',
];

export const EVENT_SORT_LABELS: Record<EventSortBy, string> = {
    date: 'Event date',
    createdAt: 'Creation date',
    title: 'Title',
    category: 'Category',
};

export const SORT_ORDERS: SortOrder[] = ['asc', 'desc'];

export const SORT_ORDER_LABELS: Record<SortOrder, string> = {
    asc: 'Ascending',
    desc: 'Descending',
};