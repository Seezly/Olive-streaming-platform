import { z } from 'zod'

export const createStreamSchema = z.object({
  title: z.string().min(1).max(140),
  description: z.string().max(500).optional(),
  category: z.string().min(1),
  tags: z.array(z.string()).max(10),
  thumbnailUrl: z.string().url().optional(),
})

export const updateStreamSchema = createStreamSchema.partial()

export type CreateStreamInput = z.infer<typeof createStreamSchema>
export type UpdateStreamInput = z.infer<typeof updateStreamSchema>