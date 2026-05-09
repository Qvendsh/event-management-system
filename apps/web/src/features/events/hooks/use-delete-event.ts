'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getErrorMessage } from '@/lib/utils/get-error-message';
import { eventsService } from '../services/events.service';

export function useDeleteEvent() {
    const router = useRouter();

    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteEvent = async (eventId: number) => {
        try {
            setIsDeleting(true);
            setError(null);

            await eventsService.deleteEvent(eventId);

            router.push('/events');
            router.refresh();
        } catch (error) {
            setError(getErrorMessage(error));
        } finally {
            setIsDeleting(false);
        }
    };

    const clearError = () => {
        setError(null);
    };

    return {
        deleteEvent,
        isDeleting,
        error,
        clearError,
    };
}