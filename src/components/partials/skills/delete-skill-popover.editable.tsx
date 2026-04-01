"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDeleteSkill } from "@/hooks/api/delete/useDeleteSkill.editable";

type DeleteSkillPopoverProps = {
  id: string;
};

export function DeleteSkillPopover({ id }: DeleteSkillPopoverProps) {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useDeleteSkill();

  const handleDelete = async () => {
    await mutateAsync(id);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-destructive hover:text-destructive"
        >
          <Trash2 size={16} />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-64 space-y-3">
        <p className="text-sm font-medium">Delete this skill?</p>
        <p className="text-muted-foreground text-xs">
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOpen(false)}
            disabled={isPending}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
