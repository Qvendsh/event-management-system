'use client';

import { Box, Container, Stack, Typography } from '@mui/material';
import { EventForm } from '../components/EventForm';
import { useCreateEvent } from '../hooks/use-create-event';
import { DEFAULT_EVENT_FORM_VALUES } from '../utils/event-form.utils';

export function CreateEventPage() {
    const { createEvent, isSubmitting, error } = useCreateEvent();

    return (
        <Box sx={{ py: { xs: 4, md: 6 } }}>
            <Container maxWidth="md">
                <Stack spacing={3}>
                    <Stack spacing={1}>
                        <Typography variant="h3" component="h1">
                            Create event
                        </Typography>

                        <Typography color="text.secondary">
                            Add a new event with date, location, category and description.
                        </Typography>
                    </Stack>

                    <EventForm
                        defaultValues={DEFAULT_EVENT_FORM_VALUES}
                        submitLabel="Create event"
                        isSubmitting={isSubmitting}
                        error={error}
                        onSubmit={createEvent}
                    />
                </Stack>
            </Container>
        </Box>
    );
}