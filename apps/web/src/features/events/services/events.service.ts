import { apiClient } from '@/lib/api/api-client';
import {
    CreateEventPayload,
    EventItem,
    GetEventsQuery,
    RecommendedEvent,
    UpdateEventPayload,
} from '../types/event.types';

const EVENTS_ENDPOINT = '/events';

function buildEventsQueryParams(query?: GetEventsQuery): URLSearchParams {
    const params = new URLSearchParams();

    if (!query) {
        return params;
    }

    if (query.category) {
        params.set('category', query.category);
    }

    if (query.dateFrom) {
        params.set('dateFrom', query.dateFrom);
    }

    if (query.dateTo) {
        params.set('dateTo', query.dateTo);
    }

    if (query.sortBy) {
        params.set('sortBy', query.sortBy);
    }

    if (query.order) {
        params.set('order', query.order);
    }

    return params;
}

export const eventsService = {
    async getEvents(query?: GetEventsQuery): Promise<EventItem[]> {
        const params = buildEventsQueryParams(query);

        const response = await apiClient.get<EventItem[]>(EVENTS_ENDPOINT, {
            params,
        });

        return response.data;
    },

    async getEventById(id: number): Promise<EventItem> {
        const response = await apiClient.get<EventItem>(`${EVENTS_ENDPOINT}/${id}`);

        return response.data;
    },

    async createEvent(payload: CreateEventPayload): Promise<EventItem> {
        const response = await apiClient.post<EventItem>(EVENTS_ENDPOINT, payload);

        return response.data;
    },

    async updateEvent(
        id: number,
        payload: UpdateEventPayload,
    ): Promise<EventItem> {
        const response = await apiClient.patch<EventItem>(
            `${EVENTS_ENDPOINT}/${id}`,
            payload,
        );

        return response.data;
    },

    async deleteEvent(id: number): Promise<void> {
        await apiClient.delete(`${EVENTS_ENDPOINT}/${id}`);
    },

    async getRecommendations(id: number): Promise<RecommendedEvent[]> {
        const response = await apiClient.get<RecommendedEvent[]>(
            `${EVENTS_ENDPOINT}/${id}/recommendations`,
        );

        return response.data;
    },
};