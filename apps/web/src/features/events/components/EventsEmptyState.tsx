'use client';

import EventBusyIcon from '@mui/icons-material/EventBusy';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { NextLink } from '@/components/common/NextLink';

export function EventsEmptyState() {
    return (
        <Paper
            sx={{
                p: {
                    xs: 3,
                    md: 5,
                },
                textAlign: 'center',
                border: '1px dashed',
                borderColor: 'divider',
            }}
        >
            <Stack spacing={2} sx={{ alignItems: 'center' }}>
                <EventBusyIcon color="action" sx={{ fontSize: 48 }} />

                <Stack spacing={1}>
                    <Typography variant="h6">No events found</Typography>

                    <Typography color="text.secondary">
                        Try changing filters or create a new event.
                    </Typography>
                </Stack>

                <Button component={NextLink} href="/events/new" variant="contained">
                    Create event
                </Button>
            </Stack>
        </Paper>
    );
}