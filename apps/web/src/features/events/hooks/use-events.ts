'use client';

import { useCallback, useEffect, useState } from 'react';
import { getErrorMessage } from '@/lib/utils/get-error-message';
import { eventsService } from '../services/events.service';
import { EventItem, GetEventsQuery } from '../types/event.types';

export function useEvents(query: GetEventsQuery) {
    const [events, setEvents] = useState<EventItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchEvents = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            const data = await eventsService.getEvents(query);

            setEvents(data);
        } catch (error) {
            setError(getErrorMessage(error));
        } finally {
            setIsLoading(false);
        }
    }, [
        query.category,
        query.dateFrom,
        query.dateTo,
        query.sortBy,
        query.order,
    ]);

    useEffect(() => {
        void fetchEvents();
    }, [fetchEvents]);

    return {
        events,
        isLoading,
        error,
        refetch: fetchEvents,
    };
}