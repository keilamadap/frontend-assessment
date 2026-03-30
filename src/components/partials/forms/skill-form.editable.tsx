"use client"

import { useFormContext } from "react-hook-form"

// zodResolver is available from "@hookform/resolvers/zod" — use it in the dialog, not here
import { PostSkill } from "@/schemas/skill.editable"

export function SkillForm() {
  const form = useFormContext<PostSkill>()

  // TODO: build the form fields using form.register or <Controller />
}
