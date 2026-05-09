import { z } from 'zod';
import { EVENT_CATEGORIES } from '../constants/event.constants';

const coordinateSchema = z.number().optional();

export const eventFormSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, 'Title is required')
        .max(120, 'Title must be less than 120 characters'),

    description: z
        .string()
        .trim()
        .min(1, 'Description is required')
        .max(2000, 'Description must be less than 2000 characters'),

    date: z.string().min(1, 'Event date is required'),

    location: z
        .string()
        .trim()
        .min(1, 'Location is required')
        .max(255, 'Location must be less than 255 characters'),

    category: z.enum(EVENT_CATEGORIES),

    latitude: coordinateSchema.refine(
        (value) => value === undefined || (value >= -90 && value <= 90),
        'Latitude must be between -90 and 90',
    ),

    longitude: coordinateSchema.refine(
        (value) => value === undefined || (value >= -180 && value <= 180),
        'Longitude must be between -180 and 180',
    ),
});