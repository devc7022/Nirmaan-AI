import { z } from 'zod';

export const workerSchema = z.object({
  workerNumber: z
    .string()
    .min(1, 'Worker number is required')
    .max(50, 'Worker number must be less than 50 characters'),
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .min(3, 'Full name must be at least 3 characters long')
    .max(100, 'Full name must be less than 100 characters'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^(?:\+91|0)?[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian phone number'),
  address: z.string().optional(),
  skill: z.string().min(1, 'Skill selection is required'),
  dailyWage: z.number().gt(0, 'Daily wage must be greater than 0'),
  joiningDate: z.string().min(1, 'Joining date is required'),
  siteId: z.string().nullable().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']),
  photoUrl: z.string().url('Please enter a valid URL').or(z.literal('')).optional(),
});

export type WorkerInput = z.infer<typeof workerSchema>;
