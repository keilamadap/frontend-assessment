"use client"

import { useState } from "react"

import { AddSkillDialog } from "@/components/partials/dialogs/add-skill-dialog.editable"
import { EditSkillDialog } from "@/components/partials/dialogs/edit-skill-dialog.editable"
import { DeleteSkillPopover } from "@/components/partials/skills/delete-skill-popover.editable"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useGetSkills } from "@/hooks/api/get/useGetTechnologies"

export default function SkillsPage() {
  const [search, setSearch] = useState("")
  const { data: skills, isPending, isError } = useGetSkills()

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Skills</h1>

      <div className="flex items-center gap-2">
        <Input
          placeholder="Search skills..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <AddSkillDialog />
      </div>

      {isPending && <p className="text-muted-foreground text-sm">Loading skills...</p>}
      {isError && <p className="text-destructive text-sm">Failed to load skills.</p>}

      {skills && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Level</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {skills.map((skill) => (
              <TableRow key={skill.id}>
                <TableCell>{skill.name}</TableCell>
                <TableCell>{skill.category}</TableCell>
                <TableCell className="capitalize">{skill.level}</TableCell>
                <TableCell className="flex items-center justify-end gap-2">
                  <EditSkillDialog skill={skill} />
                  <DeleteSkillPopover id={skill.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
