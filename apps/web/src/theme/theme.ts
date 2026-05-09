'use client';

import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    cssVariables: true,
    palette: {
        mode: 'light',
        primary: {
            main: '#2563eb',
        },
        secondary: {
            main: '#7c3aed',
        },
        background: {
            default: '#f8fafc',
            paper: '#ffffff',
        },
    },
    typography: {
        fontFamily: 'var(--font-roboto), Arial, sans-serif',
        h1: {
            fontWeight: 700,
            letterSpacing: '-0.04em',
        },
        h2: {
            fontWeight: 700,
            letterSpacing: '-0.03em',
        },
        h3: {
            fontWeight: 700,
            letterSpacing: '-0.02em',
        },
        button: {
            fontWeight: 600,
            textTransform: 'none',
        },
    },
    shape: {
        borderRadius: 14,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: 'none',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 18,
                    boxShadow: '0 16px 40px rgba(15, 23, 42, 0.08)',
                },
            },
        },
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
            },
        },
    },
});