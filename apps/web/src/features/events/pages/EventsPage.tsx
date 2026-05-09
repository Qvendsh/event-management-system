'use client';

import AddIcon from '@mui/icons-material/Add';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    Stack,
    Typography,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { NextLink } from '@/components/common/NextLink';
import { EventsEmptyState } from '../components/EventsEmptyState';
import { EventsGrid } from '../components/EventsGrid';
import { EventsToolbar } from '../components/EventsToolbar';
import { useEvents } from '../hooks/use-events';
import { EventsFiltersState } from '../types/event-filters.types';
import { GetEventsQuery } from '../types/event.types';
import {
    toEndOfDayIsoDate,
    toStartOfDayIsoDate,
} from '../utils/event-date.utils';

const DEFAULT_FILTERS: EventsFiltersState = {
    category: 'ALL',
    dateFrom: '',
    dateTo: '',
    sortBy: 'date',
    order: 'asc',
};

export function EventsPage() {
    const [filters, setFilters] = useState<EventsFiltersState>(DEFAULT_FILTERS);

    const query = useMemo<GetEventsQuery>(() => {
        return {
            category: filters.category === 'ALL' ? undefined : filters.category,
            dateFrom: filters.dateFrom
                ? toStartOfDayIsoDate(filters.dateFrom)
                : undefined,
            dateTo: filters.dateTo ? toEndOfDayIsoDate(filters.dateTo) : undefined,
            sortBy: filters.sortBy,
            order: filters.order,
        };
    }, [
        filters.category,
        filters.dateFrom,
        filters.dateTo,
        filters.sortBy,
        filters.order,
    ]);

    const { events, isLoading, error, refetch } = useEvents(query);

    return (
        <Box sx={{ py: { xs: 4, md: 6 } }}>
            <Container maxWidth="lg">
                <Stack spacing={4}>
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
                        <Stack spacing={1}>
                            <Typography variant="h3" component="h1">
                                Events
                            </Typography>

                            <Typography color="text.secondary">
                                Browse, filter and manage upcoming events.
                            </Typography>
                        </Stack>

                        <Button
                            component={NextLink}
                            href="/events/new"
                            variant="contained"
                            startIcon={<AddIcon />}
                        >
                            Create event
                        </Button>
                    </Stack>

                    <EventsToolbar
                        filters={filters}
                        onChange={setFilters}
                        onReset={() => setFilters(DEFAULT_FILTERS)}
                    />

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

                    {!isLoading && !error && events.length === 0 && <EventsEmptyState />}

                    {!isLoading && !error && events.length > 0 && (
                        <EventsGrid events={events} />
                    )}
                </Stack>
            </Container>
        </Box>
    );
}