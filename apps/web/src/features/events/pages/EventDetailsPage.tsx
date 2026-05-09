'use client';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    Stack,
} from '@mui/material';
import { NextLink } from '@/components/common/NextLink';
import { EventDetailsCard } from '../components/EventDetailsCard';
import { SimilarEventsSection } from '../components/SimilarEventsSection';
import { useEventDetails } from '../hooks/use-event-details';

type EventDetailsPageProps = {
    eventId: number;
};

export function EventDetailsPage({ eventId }: EventDetailsPageProps) {
    const { event, recommendations, isLoading, error, refetch } =
        useEventDetails(eventId);

    return (
        <Box sx={{ py: { xs: 4, md: 6 } }}>
            <Container maxWidth="lg">
                <Stack spacing={3}>
                    <Stack
                        direction={{
                            xs: 'column',
                            sm: 'row',
                        }}
                        spacing={2}
                        sx={{
                            justifyContent: 'space-between',
                            alignItems: {
                                xs: 'flex-start',
                                sm: 'center',
                            },
                        }}
                    >
                        <Button
                            component={NextLink}
                            href="/events"
                            variant="outlined"
                            startIcon={<ArrowBackIcon />}
                        >
                            Back to events
                        </Button>

                        {event && (
                            <Button
                                component={NextLink}
                                href={`/events/${event.id}/edit`}
                                variant="contained"
                                startIcon={<EditIcon />}
                            >
                                Edit event
                            </Button>
                        )}
                    </Stack>

                    {isLoading && (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                py: 8,
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    )}

                    {!isLoading && error && (
                        <Alert
                            severity="error"
                            action={
                                <Button color="inherit" size="small" onClick={() => refetch()}>
                                    Retry
                                </Button>
                            }
                        >
                            {error}
                        </Alert>
                    )}

                    {!isLoading && !error && event && (
                        <Stack spacing={4}>
                            <EventDetailsCard event={event} />
                            <SimilarEventsSection events={recommendations} />
                        </Stack>
                    )}
                </Stack>
            </Container>
        </Box>
    );
}