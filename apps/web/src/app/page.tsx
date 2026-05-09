import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
    Box,
    Button,
    Container,
    Paper,
    Stack,
    Typography,
} from '@mui/material';
import { NextLink } from '@/components/common/NextLink';

export default function HomePage() {
    return (
        <Box
            sx={{
                py: {
                    xs: 8,
                    md: 12,
                },
            }}
        >
            <Container maxWidth="lg">
                <Paper
                    sx={{
                        p: {
                            xs: 3,
                            md: 6,
                        },
                        borderRadius: 6,
                        overflow: 'hidden',
                        position: 'relative',
                        border: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    <Stack spacing={3} sx={{ maxWidth: 760 }}>
                        <Typography
                            component="p"
                            color="primary"
                            sx={{
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.12em',
                                fontSize: 13,
                            }}
                        >
                            Event Management System
                        </Typography>

                        <Typography
                            component="h1"
                            variant="h2"
                            sx={{
                                fontSize: {
                                    xs: 38,
                                    md: 64,
                                },
                            }}
                        >
                            Create, manage and discover events in one place.
                        </Typography>

                        <Typography
                            color="text.secondary"
                            sx={{
                                fontSize: {
                                    xs: 17,
                                    md: 20,
                                },
                                lineHeight: 1.7,
                            }}
                        >
                            Manage event details, filter events, update information and find
                            similar events using a simple recommendation algorithm.
                        </Typography>

                        <Stack
                            direction={{
                                xs: 'column',
                                sm: 'row',
                            }}
                            spacing={2}
                        >
                            <Button
                                component={NextLink}
                                href="/events"
                                variant="contained"
                                size="large"
                                endIcon={<ArrowForwardIcon />}
                            >
                                View events
                            </Button>

                            <Button
                                component={NextLink}
                                href="/events/new"
                                variant="outlined"
                                size="large"
                            >
                                Create event
                            </Button>
                        </Stack>
                    </Stack>
                </Paper>
            </Container>
        </Box>
    );
}