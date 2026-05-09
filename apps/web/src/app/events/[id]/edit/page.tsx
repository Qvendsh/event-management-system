import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { EditEventPage } from '@/features/events/pages/EditEventPage';

type EditEventRoutePageProps = {
    params: Promise<{
        id: string;
    }>;
};

export const metadata: Metadata = {
    title: 'Edit event',
};

export default async function EditEventRoutePage({
                                                     params,
                                                 }: EditEventRoutePageProps) {
    const { id } = await params;

    const eventId = Number(id);

    if (!Number.isInteger(eventId) || eventId <= 0) {
        notFound();
    }

    return <EditEventPage eventId={eventId} />;
}