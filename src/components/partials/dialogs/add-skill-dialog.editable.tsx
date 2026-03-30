"use client"

import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function AddSkillDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gf-blue hover:bg-gf-blue/90">
          <Plus />
          Add skill
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add skill</DialogTitle>
        </DialogHeader>
        {/* TODO: wrap with FormProvider and render <SkillForm /> */}
      </DialogContent>
    </Dialog>
  )
}
