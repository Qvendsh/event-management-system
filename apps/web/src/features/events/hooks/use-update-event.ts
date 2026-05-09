'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getErrorMessage } from '@/lib/utils/get-error-message';
import { eventsService } from '../services/events.service';
import { EventFormValues } from '../types/event-form.types';
import { mapEventFormValuesToUpdatePayload } from '../utils/event-form.utils';

export function useUpdateEvent(eventId: number) {
    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateEvent = async (values: EventFormValues) => {
        try {
            setIsSubmitting(true);
            setError(null);

            const updatedEvent = await eventsService.updateEvent(
                eventId,
                mapEventFormValuesToUpdatePayload(values),
            );

            router.push(`/events/${updatedEvent.id}`);
            router.refresh();
        } catch (error) {
            setError(getErrorMessage(error));
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        updateEvent,
        isSubmitting,
        error,
    };
}