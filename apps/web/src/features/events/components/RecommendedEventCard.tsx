import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
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
import { RecommendedEvent } from '../types/event.types';
import { formatEventDate } from '../utils/event-date.utils';

type RecommendedEventCardProps = {
    event: RecommendedEvent;
};

export function RecommendedEventCard({ event }: RecommendedEventCardProps) {
    return (
        <Card
            sx={{
                height: '100%',
                border: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <CardContent sx={{ flexGrow: 1 }}>
                <Stack spacing={2}>
                    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                        <Chip
                            label={EVENT_CATEGORY_LABELS[event.category]}
                            size="small"
                            color="primary"
                            variant="outlined"
                        />
                    </Stack>

                    <Stack spacing={1}>
                        <Typography variant="h6">{event.title}</Typography>

                        <Typography
                            color="text.secondary"
                            sx={{
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                            }}
                        >
                            {event.description}
                        </Typography>
                    </Stack>

                    <Stack spacing={1}>
                        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                            <CalendarMonthIcon fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                                {formatEventDate(event.date)}
                            </Typography>
                        </Stack>

                        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                            <LocationOnIcon fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                                {event.location}
                            </Typography>
                        </Stack>
                    </Stack>

                    {event.recommendationReasons.length > 0 && (
                        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                            {event.recommendationReasons.map((reason) => (
                                <Chip key={reason} label={reason} size="small" />
                            ))}
                        </Stack>
                    )}
                </Stack>
            </CardContent>

            <CardActions sx={{ px: 2, pb: 2 }}>
                <Button
                    component={NextLink}
                    href={`/events/${event.id}`}
                    variant="outlined"
                    fullWidth
                >
                    View event
                </Button>
            </CardActions>
        </Card>
    );
}