import type { Metadata } from 'next';
import { CreateEventPage } from '@/features/events/pages/CreateEventPage';

export const metadata: Metadata = {
    title: 'Create event',
};

export default function CreateEventRoutePage() {
    return <CreateEventPage />;
}