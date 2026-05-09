export function formatEventDate(date: string): string {
    return new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
    }).format(new Date(date));
}

export function formatDateForInput(date: string): string {
    return date.split('T')[0];
}

export function toStartOfDayIsoDate(date: string): string {
    return new Date(`${date}T00:00:00.000Z`).toISOString();
}

export function toEndOfDayIsoDate(date: string): string {
    return new Date(`${date}T23:59:59.999Z`).toISOString();
}