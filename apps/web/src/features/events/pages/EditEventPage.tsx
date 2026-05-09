'use client';

import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    Stack,
    Typography,
} from '@mui/material';
import { EventForm } from '../components/EventForm';
import { useEvent } from '../hooks/use-event';
import { useUpdateEvent } from '../hooks/use-update-event';
import { getEventFormDefaultValues } from '../utils/event-form.utils';

type EditEventPageProps = {
    eventId: number;
};

export function EditEventPage({ eventId }: EditEventPageProps) {
    const {
        event,
        isLoading,
        error: eventError,
        refetch,
    } = useEvent(eventId);

    const {
        updateEvent,
        isSubmitting,
        error: updateError,
    } = useUpdateEvent(eventId);

    return (
        <Box sx={{ py: { xs: 4, md: 6 } }}>
            <Container maxWidth="md">
                <Stack spacing={3}>
                    <Stack spacing={1}>
                        <Typography variant="h3" component="h1">
                            Edit event
                        </Typography>

                        <Typography color="text.secondary">
                            Update event details and save changes.
                        </Typography>
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

                    {!isLoading && eventError && (
                        <Alert
                            severity="error"
                            action={
                                <Button color="inherit" size="small" onClick={() => refetch()}>
                                    Retry
                                </Button>
                            }
                        >
                            {eventError}
                        </Alert>
                    )}

                    {!isLoading && !eventError && event && (
                        <EventForm
                            defaultValues={getEventFormDefaultValues(event)}
                            submitLabel="Save changes"
                            isSubmitting={isSubmitting}
                            error={updateError}
                            onSubmit={updateEvent}
                        />
                    )}
                </Stack>
            </Container>
        </Box>
    );
}