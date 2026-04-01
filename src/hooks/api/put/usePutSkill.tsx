import { useMutation, useQueryClient } from "@tanstack/react-query";

import { skillsApi } from "@/lib/api/skills";
import { queryKeys } from "@/lib/query-keys";
import {
  skillSchema,
  type PutSkill,
  type Skill,
} from "@/schemas/skill.editable";

type PutSkillPayload = {
  id: string;
  data: PutSkill;
};

export function usePutSkill() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.skills.list(),
      });
    },
  });
}

async function putSkill({ id, data }: PutSkillPayload): Promise<Skill> {
  const response = await skillsApi
    .put(`skills/${id}`, {
      json: data,
    })
    .json();

  return skillSchema.parse(response);
}
