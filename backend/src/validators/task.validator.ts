import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().nullable().optional(),
  status: z.enum(['pending', 'in-progress', 'done']),
});
