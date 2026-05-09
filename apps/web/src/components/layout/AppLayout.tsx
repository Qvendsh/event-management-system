import { Box } from '@mui/material';
import { ReactNode } from 'react';
import { AppHeader } from './AppHeader';

type AppLayoutProps = {
    children: ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                bgcolor: 'background.default',
            }}
        >
            <AppHeader />

            <Box component="main">{children}</Box>
        </Box>
    );
}