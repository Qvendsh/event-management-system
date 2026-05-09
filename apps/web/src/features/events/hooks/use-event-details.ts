'use client';

import { useCallback, useEffect, useState } from 'react';
import { getErrorMessage } from '@/lib/utils/get-error-message';
import { eventsService } from '../services/events.service';
import { EventItem, RecommendedEvent } from '../types/event.types';

export function useEventDetails(eventId: number) {
    const [event, setEvent] = useState<EventItem | null>(null);
    const [recommendations, setRecommendations] = useState<RecommendedEvent[]>(
        [],
    );
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchEventDetails = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            const [eventData, recommendationsData] = await Promise.all([
                eventsService.getEventById(eventId),
                eventsService.getRecommendations(eventId),
            ]);

            setEvent(eventData);
            setRecommendations(recommendationsData);
        } catch (error) {
            setError(getErrorMessage(error));
        } finally {
            setIsLoading(false);
        }
    }, [eventId]);

    useEffect(() => {
        void fetchEventDetails();
    }, [fetchEventDetails]);

    return {
        event,
        recommendations,
        isLoading,
        error,
        refetch: fetchEventDetails,
    };
}