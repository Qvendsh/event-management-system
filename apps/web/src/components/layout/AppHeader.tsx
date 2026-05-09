'use client';

import AddIcon from '@mui/icons-material/Add';
import EventIcon from '@mui/icons-material/Event';
import {
    AppBar,
    Box,
    Button,
    Container,
    Stack,
    Toolbar,
    Typography,
} from '@mui/material';
import { NextLink } from '@/components/common/NextLink';

export function AppHeader() {
    return (
        <AppBar
            position="sticky"
            color="inherit"
            elevation={0}
            sx={{
                borderBottom: '1px solid',
                borderColor: 'divider',
                backdropFilter: 'blur(16px)',
                backgroundColor: 'rgba(255, 255, 255, 0.82)',
            }}
        >
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ minHeight: 72 }}>
                    <Button
                        component={NextLink}
                        href="/"
                        startIcon={<EventIcon />}
                        sx={{
                            color: 'text.primary',
                            fontSize: 18,
                            fontWeight: 800,
                            px: 0,
                            '&:hover': {
                                backgroundColor: 'transparent',
                            },
                        }}
                    >
                        EMS
                    </Button>

                    <Box sx={{ flexGrow: 1 }} />

                    <Stack
                        direction="row"
                        spacing={1.5}
                        sx={{ alignItems: 'center' }}
                    >
                        <Button component={NextLink} href="/events" color="inherit">
                            Events
                        </Button>

                        <Button
                            component={NextLink}
                            href="/events/new"
                            variant="contained"
                            startIcon={<AddIcon />}
                        >
                            Create event
                        </Button>
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    );
}