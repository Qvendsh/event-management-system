import {
    EventCategory,
    EventSortBy,
    SortOrder,
} from './event.types';

export type EventsCategoryFilter = EventCategory | 'ALL';

export type EventsFiltersState = {
    category: EventsCategoryFilter;
    dateFrom: string;
    dateTo: string;
    sortBy: EventSortBy;
    order: SortOrder;
};