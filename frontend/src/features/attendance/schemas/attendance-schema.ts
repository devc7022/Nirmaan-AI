import { z } from 'zod';

export const attendanceSchema = z.object({
  workerId: z.string().min(1, 'Worker is required'),
  siteId: z.string().min(1, 'Construction Site is required'),
  attendanceDate: z.string().min(1, 'Attendance Date is required'),
  hoursWorked: z
    .number()
    .min(0, 'Hours Worked must be between 0 and 24')
    .max(24, 'Hours Worked must be between 0 and 24'),
  present: z.boolean(),
  remarks: z.string().max(500, 'Remarks cannot exceed 500 characters').optional(),
});

export type AttendanceInput = z.infer<typeof attendanceSchema>;
