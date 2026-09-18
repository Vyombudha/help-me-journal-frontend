import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { ProjectCardProps } from "@/types/ProjectCard.types"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { useState } from "react"
import { Trash2 } from "lucide-react"
import ConfirmDelete from "./ConfirmDelete"
import { useDeleteProject } from "@/hooks/useProjectMutations"

export function ProjectCard({ project }: ProjectCardProps) {
  const [deleteOpen, setDeleteOpen] = useState(false)
  const deleteProject = useDeleteProject()
  return (
    <div className="w-full">
      <ContextMenu>
        <ContextMenuTrigger>
          <InfoCard project={project} />
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Edit</ContextMenuItem>
          <ContextMenuItem
            variant="destructive"
            onClick={() => setDeleteOpen(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <ConfirmDelete
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={() => {
          deleteProject.mutate(project.id, {
            onSuccess: () => {
              setDeleteOpen(false)
            },
          })
        }}
      />
    </div>
  )
}

function InfoCard({ project }: ProjectCardProps) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-2">
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">{project.status}</Badge>
        </CardAction>
        <CardTitle>{project.name}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">Open Project</Button>
      </CardFooter>
    </Card>
  )
}
