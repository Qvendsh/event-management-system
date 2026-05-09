import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import UpdateIcon from '@mui/icons-material/Update';
import {
    Box,
    Card,
    CardContent,
    Chip,
    Divider,
    Stack,
    Typography,
} from '@mui/material';
import { EVENT_CATEGORY_LABELS } from '../constants/event.constants';
import { EventItem } from '../types/event.types';
import { formatEventDate } from '../utils/event-date.utils';

type EventDetailsCardProps = {
    event: EventItem;
};

export function EventDetailsCard({ event }: EventDetailsCardProps) {
    return (
        <Card
            sx={{
                border: '1px solid',
                borderColor: 'divider',
            }}
        >
            <CardContent
                sx={{
                    p: {
                        xs: 3,
                        md: 4,
                    },
                }}
            >
                <Stack spacing={3}>
                    <Box>
                        <Chip
                            label={EVENT_CATEGORY_LABELS[event.category]}
                            color="primary"
                            variant="outlined"
                        />
                    </Box>

                    <Stack spacing={1.5}>
                        <Typography variant="h3" component="h1">
                            {event.title}
                        </Typography>

                        <Typography
                            color="text.secondary"
                            sx={{
                                fontSize: 18,
                                lineHeight: 1.7,
                            }}
                        >
                            {event.description}
                        </Typography>
                    </Stack>

                    <Divider />

                    <Stack spacing={2}>
                        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                            <CalendarMonthIcon color="primary" />
                            <Box>
                                <Typography variant="body2" color="text.secondary">
                                    Event date
                                </Typography>
                                <Typography sx={{ fontWeight: 600 }}>
                                    {formatEventDate(event.date)}
                                </Typography>
                            </Box>
                        </Stack>

                        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                            <LocationOnIcon color="primary" />
                            <Box>
                                <Typography variant="body2" color="text.secondary">
                                    Location
                                </Typography>
                                <Typography sx={{ fontWeight: 600 }}>{event.location}</Typography>
                            </Box>
                        </Stack>

                        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                            <UpdateIcon color="primary" />
                            <Box>
                                <Typography variant="body2" color="text.secondary">
                                    Last updated
                                </Typography>
                                <Typography sx={{ fontWeight: 600 }}>
                                    {formatEventDate(event.updatedAt)}
                                </Typography>
                            </Box>
                        </Stack>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}