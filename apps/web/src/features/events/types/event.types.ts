export type EventCategory =
    | 'CONFERENCE'
    | 'WORKSHOP'
    | 'MEETUP'
    | 'CONCERT'
    | 'SPORT'
    | 'OTHER';

export type EventSortBy = 'date' | 'createdAt' | 'title' | 'category';

export type SortOrder = 'asc' | 'desc';

export type EventItem = {
    id: number;
    title: string;
    description: string;
    date: string;
    location: string;
    category: EventCategory;
    latitude: number | null;
    longitude: number | null;
    createdAt: string;
    updatedAt: string;
};

export type RecommendedEvent = EventItem & {
    recommendationScore: number;
    recommendationReasons: string[];
};

export type GetEventsQuery = {
    category?: EventCategory;
    dateFrom?: string;
    dateTo?: string;
    sortBy?: EventSortBy;
    order?: SortOrder;
};

export type CreateEventPayload = {
    title: string;
    description: string;
    date: string;
    location: string;
    category: EventCategory;
    latitude?: number;
    longitude?: number;
};

export type UpdateEventPayload = Partial<CreateEventPayload>;