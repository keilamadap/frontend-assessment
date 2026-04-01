"use client";

import { useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { PostSkill } from "@/schemas/skill.editable";

export function SkillForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<PostSkill>();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <Input id="name" {...register("name")} />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="category" className="text-sm font-medium">
          Category
        </label>
        <Input id="category" {...register("category")} />
        {errors.category && (
          <p className="text-sm text-destructive">{errors.category.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="level" className="text-sm font-medium">
          Level
        </label>
        <Input id="level" {...register("level")} />
        {errors.level && (
          <p className="text-sm text-destructive">{errors.level.message}</p>
        )}
      </div>
    </div>
  );
}
