import { z } from "zod"

// TODO: define the full API response schema from the shape described in the README
export const applicationApiSchema = z.object({})
export type ApplicationApi = z.infer<typeof applicationApiSchema>

// TODO: define what gets exposed to the frontend — only the fields needed to render the card
export const applicationSchema = z.object({})
export type Application = z.infer<typeof applicationSchema>
