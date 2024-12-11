import { z } from 'zod';

export const SUBJECT_TYPES = [
  'Question',
  'Complaint',
  'Suggestion',
  'Other'
] as const;

export const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png'
] as const;

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export interface ComplianceFormData {
  subject: typeof SUBJECT_TYPES[number];
  title: string;
  description: string;
  email: string;
  fullName?: string;
  company?: string;
  attachments: File[];
}

export const complianceFormSchema = z.object({
  subject: z.enum(SUBJECT_TYPES as unknown as [string, ...string[]]),
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(10).max(1000),
  email: z.string().email('Invalid email address'),
  fullName: z.string().optional(),
  company: z.string().optional(),
  attachments: z.array(z.custom<File>())
});