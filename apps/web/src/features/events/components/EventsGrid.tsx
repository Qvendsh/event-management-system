'use client';

import { Box } from '@mui/material';
import { EventItem } from '../types/event.types';
import { EventCard } from './EventCard';

type EventsGridProps = {
    events: EventItem[];
};

export function EventsGrid({ events }: EventsGridProps) {
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, minmax(0, 1fr))',
                    lg: 'repeat(3, minmax(0, 1fr))',
                },
                gap: 3,
            }}
        >
            {events.map((event) => (
                <EventCard key={event.id} event={event} />
            ))}
        </Box>
    );
}