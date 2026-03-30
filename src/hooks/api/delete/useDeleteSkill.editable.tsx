import { useMutation } from "@tanstack/react-query"

import { skillsApi } from "@/lib/api/skills"

export function useDeleteSkill() {
  return useMutation({
    mutationFn: (id: string) => deleteSkill(id),
    // TODO
  })
}

async function deleteSkill(id: string): Promise<void> {
  // TODO
}
