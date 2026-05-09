import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NextLink } from '@/components/common/NextLink';
import {
    EVENT_CATEGORIES,
    EVENT_CATEGORY_LABELS,
} from '../constants/event.constants';
import { eventFormSchema } from '../schemas/event-form.schema';
import { EventFormValues } from '../types/event-form.types';

type EventFormProps = {
    defaultValues: EventFormValues;
    submitLabel: string;
    isSubmitting: boolean;
    error: string | null;
    onSubmit: (values: EventFormValues) => void | Promise<void>;
};

export function EventForm({
                              defaultValues,
                              submitLabel,
                              isSubmitting,
                              error,
                              onSubmit,
                          }: EventFormProps) {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<EventFormValues>({
        resolver: zodResolver(eventFormSchema),
        defaultValues,
        mode: 'onBlur',
    });

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
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={3}>
                        {error && <Alert severity="error">{error}</Alert>}

                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Title"
                                    fullWidth
                                    error={Boolean(errors.title)}
                                    helperText={errors.title?.message}
                                />
                            )}
                        />

                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Description"
                                    fullWidth
                                    multiline
                                    minRows={4}
                                    error={Boolean(errors.description)}
                                    helperText={errors.description?.message}
                                />
                            )}
                        />

                        <Controller
                            name="date"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Event date"
                                    type="datetime-local"
                                    fullWidth
                                    error={Boolean(errors.date)}
                                    helperText={errors.date?.message}
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true,
                                        },
                                    }}
                                />
                            )}
                        />

                        <Controller
                            name="location"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Location"
                                    fullWidth
                                    error={Boolean(errors.location)}
                                    helperText={errors.location?.message}
                                />
                            )}
                        />

                        <Controller
                            name="category"
                            control={control}
                            render={({ field }) => (
                                <FormControl fullWidth error={Boolean(errors.category)}>
                                    <InputLabel id="event-category-label">Category</InputLabel>

                                    <Select
                                        {...field}
                                        labelId="event-category-label"
                                        label="Category"
                                    >
                                        {EVENT_CATEGORIES.map((category) => (
                                            <MenuItem key={category} value={category}>
                                                {EVENT_CATEGORY_LABELS[category]}
                                            </MenuItem>
                                        ))}
                                    </Select>

                                    {errors.category && (
                                        <FormHelperText>{errors.category.message}</FormHelperText>
                                    )}
                                </FormControl>
                            )}
                        />

                        <Stack
                            direction={{
                                xs: 'column',
                                sm: 'row',
                            }}
                            spacing={2}
                        >
                            <Controller
                                name="latitude"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        label="Latitude"
                                        type="number"
                                        fullWidth
                                        value={field.value ?? ''}
                                        onChange={(event) =>
                                            field.onChange(
                                                event.target.value === ''
                                                    ? undefined
                                                    : Number(event.target.value),
                                            )
                                        }
                                        error={Boolean(errors.latitude)}
                                        helperText={errors.latitude?.message}
                                    />
                                )}
                            />

                            <Controller
                                name="longitude"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        label="Longitude"
                                        type="number"
                                        fullWidth
                                        value={field.value ?? ''}
                                        onChange={(event) =>
                                            field.onChange(
                                                event.target.value === ''
                                                    ? undefined
                                                    : Number(event.target.value),
                                            )
                                        }
                                        error={Boolean(errors.longitude)}
                                        helperText={errors.longitude?.message}
                                    />
                                )}
                            />
                        </Stack>

                        <Stack
                            direction={{
                                xs: 'column',
                                sm: 'row',
                            }}
                            spacing={2}
                            sx={{
                                justifyContent: 'space-between',
                            }}
                        >
                            <Button
                                component={NextLink}
                                href="/events"
                                variant="outlined"
                                startIcon={<ArrowBackIcon />}
                            >
                                Back to events
                            </Button>

                            <Button
                                type="submit"
                                variant="contained"
                                startIcon={<SaveIcon />}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Saving...' : submitLabel}
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </CardContent>
        </Card>
    );
}