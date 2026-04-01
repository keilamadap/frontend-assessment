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
  DialogDescription,
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
  const [formError, setFormError] = useState<string | null>(null);

  const { mutateAsync, isPending } = usePutSkill();

  const form = useForm<PutSkill>({
    resolver: zodResolver(skillInputSchema),
    defaultValues: {
      name: skill.name,
      category: skill.category,
      level: skill.level,
    },
  });

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (!nextOpen) {
      setFormError(null);
      form.reset({
        name: skill.name,
        category: skill.category,
        level: skill.level,
      });
    }
  };

  const onSubmit = async (data: PutSkill) => {
    try {
      setFormError(null);
      await mutateAsync({
        id: skill.id,
        data,
      });
      setOpen(false);
    } catch {
      setFormError("Failed to update skill. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil size={16} />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit skill</DialogTitle>
          <DialogDescription className="sr-only">
            Edit skill form
          </DialogDescription>
        </DialogHeader>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <SkillForm />

            {formError && (
              <p className="text-sm text-destructive">{formError}</p>
            )}

            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? "Saving..." : "Save changes"}
            </Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
