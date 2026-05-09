'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getErrorMessage } from '@/lib/utils/get-error-message';
import { eventsService } from '../services/events.service';
import { EventFormValues } from '../types/event-form.types';
import { mapEventFormValuesToPayload } from '../utils/event-form.utils';

export function useCreateEvent() {
    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createEvent = async (values: EventFormValues) => {
        try {
            setIsSubmitting(true);
            setError(null);

            const createdEvent = await eventsService.createEvent(
                mapEventFormValuesToPayload(values),
            );

            router.push(`/events/${createdEvent.id}`);
            router.refresh();
        } catch (error) {
            setError(getErrorMessage(error));
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        createEvent,
        isSubmitting,
        error,
    };
}