import { z } from 'zod';
import { eventFormSchema } from '../schemas/event-form.schema';

export type EventFormValues = z.infer<typeof eventFormSchema>;