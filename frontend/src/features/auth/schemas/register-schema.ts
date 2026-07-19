import { z } from 'zod';

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .max(100, 'Full name must be less than 100 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(12, 'Password must be at least 12 characters long')
    .max(72, 'Password must be less than 72 characters'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
