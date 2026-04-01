"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
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
import { usePostSkill } from "@/hooks/api/post/usePostSkill";
import { PostSkill, skillInputSchema } from "@/schemas/skill.editable";

export function AddSkillDialog() {
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const { mutateAsync, isPending } = usePostSkill();

  const form = useForm<PostSkill>({
    resolver: zodResolver(skillInputSchema),
    defaultValues: {
      name: "",
      category: "",
      level: "",
    },
  });

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (!nextOpen) {
      setFormError(null);
      form.reset();
    }
  };

  const onSubmit = async (data: PostSkill) => {
    try {
      setFormError(null);
      await mutateAsync(data);
      form.reset();
      setOpen(false);
    } catch {
      setFormError("Failed to create skill. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-gf-blue hover:bg-gf-blue/90">
          <Plus />
          Add skill
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add skill</DialogTitle>
          <DialogDescription className="sr-only">
            Add skill form
          </DialogDescription>
        </DialogHeader>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <SkillForm />

            {formError && (
              <p className="text-sm text-destructive">{formError}</p>
            )}

            <Button
              type="submit"
              disabled={isPending}
              className="bg-gf-blue hover:bg-gf-blue/90 w-full"
            >
              {isPending ? "Saving..." : "Save skill"}
            </Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
