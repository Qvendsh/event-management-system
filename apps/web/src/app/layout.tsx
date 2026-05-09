import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { AppLayout } from '@/components/layout/AppLayout';
import { theme } from '@/theme/theme';
import './globals.css';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto',
});

export const metadata: Metadata = {
    title: {
        default: 'Event Management System',
        template: '%s | Event Management System',
    },
    description: 'Create, manage and discover events.',
};

type RootLayoutProps = {
    children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" className={roboto.variable}>
        <body>
        <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
                <AppLayout>{children}</AppLayout>
            </ThemeProvider>
        </AppRouterCacheProvider>
        </body>
        </html>
    );
}