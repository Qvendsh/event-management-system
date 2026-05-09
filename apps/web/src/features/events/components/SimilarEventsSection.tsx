import { Box, Paper, Stack, Typography } from '@mui/material';
import { RecommendedEvent } from '../types/event.types';
import { RecommendedEventCard } from './RecommendedEventCard';

type SimilarEventsSectionProps = {
    events: RecommendedEvent[];
};

export function SimilarEventsSection({ events }: SimilarEventsSectionProps) {
    if (events.length === 0) {
        return (
            <Paper
                sx={{
                    p: 3,
                    border: '1px dashed',
                    borderColor: 'divider',
                }}
            >
                <Stack spacing={1}>
                    <Typography variant="h5">Similar events</Typography>
                    <Typography color="text.secondary">
                        No similar events found for this event.
                    </Typography>
                </Stack>
            </Paper>
        );
    }

    return (
        <Stack spacing={2}>
            <Stack spacing={0.5}>
                <Typography variant="h5">Similar events</Typography>

                <Typography color="text.secondary">
                    Recommended based on category, location and event date.
                </Typography>
            </Stack>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        md: 'repeat(2, minmax(0, 1fr))',
                    },
                    gap: 2,
                }}
            >
                {events.map((event) => (
                    <RecommendedEventCard key={event.id} event={event} />
                ))}
            </Box>
        </Stack>
    );
}