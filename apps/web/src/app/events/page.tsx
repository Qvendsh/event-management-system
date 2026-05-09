import type { Metadata } from 'next';
import { EventsPage } from '@/features/events/pages/EventsPage';

export const metadata: Metadata = {
    title: 'Events',
};

export default function EventsRoutePage() {
    return <EventsPage />;
}