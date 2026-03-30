"use client"

import { Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DeleteSkillPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
          <Trash2 size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 space-y-3">
        <p className="text-sm font-medium">Delete this skill?</p>
        <p className="text-muted-foreground text-xs">This action cannot be undone.</p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm">Cancel</Button>
          <Button variant="destructive" size="sm">Delete</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
