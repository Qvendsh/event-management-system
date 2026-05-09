import {
    CreateEventPayload,
    EventItem,
    UpdateEventPayload,
} from '../types/event.types';
import { EventFormValues } from '../types/event-form.types';

export const DEFAULT_EVENT_FORM_VALUES: EventFormValues = {
    title: '',
    description: '',
    date: '',
    location: '',
    category: 'MEETUP',
    latitude: undefined,
    longitude: undefined,
};

export function formatIsoDateToDateTimeLocal(date: string): string {
    const parsedDate = new Date(date);

    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getDate()).padStart(2, '0');
    const hours = String(parsedDate.getHours()).padStart(2, '0');
    const minutes = String(parsedDate.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function getEventFormDefaultValues(event?: EventItem): EventFormValues {
    if (!event) {
        return DEFAULT_EVENT_FORM_VALUES;
    }

    return {
        title: event.title,
        description: event.description,
        date: formatIsoDateToDateTimeLocal(event.date),
        location: event.location,
        category: event.category,
        latitude: event.latitude ?? undefined,
        longitude: event.longitude ?? undefined,
    };
}

export function mapEventFormValuesToPayload(
    values: EventFormValues,
): CreateEventPayload {
    return {
        title: values.title.trim(),
        description: values.description.trim(),
        date: new Date(values.date).toISOString(),
        location: values.location.trim(),
        category: values.category,
        latitude: values.latitude,
        longitude: values.longitude,
    };
}

export function mapEventFormValuesToUpdatePayload(
    values: EventFormValues,
): UpdateEventPayload {
    return mapEventFormValuesToPayload(values);
}