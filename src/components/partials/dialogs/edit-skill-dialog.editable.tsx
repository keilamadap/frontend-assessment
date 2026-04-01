"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";

import { SkillForm } from "@/components/partials/forms/skill-form.editable";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { usePutSkill } from "@/hooks/api/put/usePutSkill";
import { PutSkill, Skill, skillInputSchema } from "@/schemas/skill.editable";

type EditSkillDialogProps = {
  skill: Skill;
};

export function EditSkillDialog({ skill }: EditSkillDialogProps) {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = usePutSkill();

  const form = useForm<PutSkill>({
    resolver: zodResolver(skillInputSchema),
    defaultValues: {
      name: skill.name,
      category: skill.category,
      level: skill.level,
    },
  });

  const onSubmit = async (data: PutSkill) => {
    await mutateAsync({
      id: skill.id,
      data,
    });

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit skill</DialogTitle>
        </DialogHeader>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <SkillForm />

            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? "Saving..." : "Save changes"}
            </Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
