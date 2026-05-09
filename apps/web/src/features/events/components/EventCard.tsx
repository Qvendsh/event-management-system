'use client';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    Stack,
    Typography,
} from '@mui/material';
import { NextLink } from '@/components/common/NextLink';
import { EVENT_CATEGORY_LABELS } from '../constants/event.constants';
import { EventItem } from '../types/event.types';
import { formatEventDate } from '../utils/event-date.utils';

type EventCardProps = {
    event: EventItem;
};

export function EventCard({ event }: EventCardProps) {
    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid',
                borderColor: 'divider',
            }}
        >
            <CardContent sx={{ flexGrow: 1 }}>
                <Stack spacing={2}>
                    <Box>
                        <Chip
                            label={EVENT_CATEGORY_LABELS[event.category]}
                            color="primary"
                            variant="outlined"
                            size="small"
                        />
                    </Box>

                    <Stack spacing={1}>
                        <Typography variant="h6" component="h2">
                            {event.title}
                        </Typography>

                        <Typography
                            color="text.secondary"
                            sx={{
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                            }}
                        >
                            {event.description}
                        </Typography>
                    </Stack>

                    <Stack spacing={1}>
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{ alignItems: 'center' }}
                        >
                            <CalendarMonthIcon fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                                {formatEventDate(event.date)}
                            </Typography>
                        </Stack>

                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{ alignItems: 'center' }}
                        >
                            <LocationOnIcon fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                                {event.location}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </CardContent>

            <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                    component={NextLink}
                    href={`/events/${event.id}`}
                    variant="contained"
                    fullWidth
                >
                    View details
                </Button>
            </CardActions>
        </Card>
    );
}