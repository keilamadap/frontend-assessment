import { useQuery } from "@tanstack/react-query"
import { z } from "zod"

import { skillsApi } from "@/lib/api/skills"
import { queryKeys } from "@/lib/query-keys"
import { skillSchema, type Skill } from "@/schemas/skill.editable"

export function useGetSkills(params?: Record<string, string>) {
  return useQuery({
    queryKey: queryKeys.skills.list(params),
    queryFn: () => getSkills(params),
  })
}

async function getSkills(params?: Record<string, string>): Promise<Skill[]> {
  const data = await skillsApi.get("skills", { searchParams: params }).json()
  return z.array(skillSchema).parse(data)
}
