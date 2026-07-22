import { z } from 'zod';

export const siteSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Site Name is required')
      .min(3, 'Site Name must be at least 3 characters'),
    address: z.string().min(1, 'Address is required'),
    builderName: z.string().min(1, 'Builder Name is required'),
    supervisor: z.string().min(1, 'Supervisor is required'),
    startDate: z.string().min(1, 'Start Date is required'),
    endDate: z.string().min(1, 'End Date is required'),
    status: z.enum(['PLANNED', 'ACTIVE', 'COMPLETED', 'ON_HOLD']),
    description: z.string().optional(),
    workerIds: z.array(z.string()).optional(),
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        const start = new Date(data.startDate);
        const end = new Date(data.endDate);
        return end >= start;
      }
      return true;
    },
    {
      message: 'End Date must be greater than or equal to Start Date',
      path: ['endDate'],
    }
  );

export type SiteInput = z.infer<typeof siteSchema>;
