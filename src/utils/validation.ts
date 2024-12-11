import { z } from 'zod';
import { ACTIVITY_AREAS, SERVICE_TYPES } from '../types/form';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[\d\s-]{10,}$/, 'Invalid phone number'),
  activityArea: z.enum(ACTIVITY_AREAS as unknown as [string, ...string[]]),
  serviceType: z.enum(SERVICE_TYPES as unknown as [string, ...string[]]),
  description: z.string().min(10).max(1000)
});