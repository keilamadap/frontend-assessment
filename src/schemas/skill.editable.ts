import { z } from "zod"

export const skillSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  level: z.string(),
})

export type Skill = z.infer<typeof skillSchema>

// TODO: define the fields for create/update operations
export const skillInputSchema = z.object({})
export type PostSkill = z.infer<typeof skillInputSchema>
export type PutSkill = z.infer<typeof skillInputSchema>
