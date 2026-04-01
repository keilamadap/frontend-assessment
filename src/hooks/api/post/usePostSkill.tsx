import { useMutation, useQueryClient } from "@tanstack/react-query";

import { skillsApi } from "@/lib/api/skills";
import { queryKeys } from "@/lib/query-keys";
import {
  skillSchema,
  type PostSkill,
  type Skill,
} from "@/schemas/skill.editable";

export function usePostSkill() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.skills.list(),
      });
    },
  });
}

async function postSkill(payload: PostSkill): Promise<Skill> {
  const data = await skillsApi
    .post("skills", {
      json: payload,
    })
    .json();

  return skillSchema.parse(data);
}
