export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  activityArea: string;
  serviceType: string;
  description: string;
}

export const ACTIVITY_AREAS = [
  'Technology',
  'Healthcare',
  'Education',
  'Finance',
  'Retail',
  'Manufacturing',
  'Other'
] as const;

export const SERVICE_TYPES = [
  'Consulting',
  'Development',
  'Design',
  'Marketing',
  'Support',
  'Training'
] as const;