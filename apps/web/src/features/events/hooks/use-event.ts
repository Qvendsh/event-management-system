'use client';

import { useCallback, useEffect, useState } from 'react';
import { getErrorMessage } from '@/lib/utils/get-error-message';
import { eventsService } from '../services/events.service';
import { EventItem } from '../types/event.types';

export function useEvent(eventId: number) {
    const [event, setEvent] = useState<EventItem | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchEvent = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            const eventData = await eventsService.getEventById(eventId);

            setEvent(eventData);
        } catch (error) {
            setError(getErrorMessage(error));
        } finally {
            setIsLoading(false);
        }
    }, [eventId]);

    useEffect(() => {
        void fetchEvent();
    }, [fetchEvent]);

    return {
        event,
        isLoading,
        error,
        refetch: fetchEvent,
    };
}