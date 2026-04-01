import { z } from "zod";

export const skillSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  level: z.string(),
});

export type Skill = z.infer<typeof skillSchema>;

// TODO: define the fields for create/update operations
export const skillInputSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  level: z.string().min(1, "Level is required"),
});

export type SkillInput = z.infer<typeof skillInputSchema>;
export type PostSkill = SkillInput;
export type PutSkill = SkillInput;
