export const EVENT_SORT_FIELDS = [
    'date',
    'createdAt',
    'title',
    'category',
] as const;

export const EVENT_SORT_ORDERS = ['asc', 'desc'] as const;

export const DEFAULT_EVENTS_SORT_BY = 'date';

export const DEFAULT_EVENTS_ORDER = 'asc';

export const RECOMMENDATION_LIMIT = 5;

export const RECOMMENDATION_CANDIDATES_LIMIT = 30;

export const RECOMMENDATION_MAX_DATE_DISTANCE_DAYS = 30;

export const RECOMMENDATION_SCORES = {
    SAME_CATEGORY: 3,
    SAME_LOCATION: 2,
    DATE_WITHIN_7_DAYS: 2,
    DATE_WITHIN_30_DAYS: 1,
} as const;