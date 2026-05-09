import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { EventDetailsPage } from '@/features/events/pages/EventDetailsPage';

type EventDetailsRoutePageProps = {
    params: Promise<{
        id: string;
    }>;
};

export const metadata: Metadata = {
    title: 'Event details',
};

export default async function EventDetailsRoutePage({
                                                        params,
                                                    }: EventDetailsRoutePageProps) {
    const { id } = await params;

    const eventId = Number(id);

    if (!Number.isInteger(eventId) || eventId <= 0) {
        notFound();
    }

    return <EventDetailsPage eventId={eventId} />;
}