import { Badge } from "@/components/ui/badge"
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
import { Trash2, Pencil } from "lucide-react"
import ConfirmDelete from "./ConfirmDelete"
import { useDeleteProject, useUpdateProject } from "@/hooks/useProjectMutations"
import EditProject from "./EditProject"
import type { UpdateProjectDTO } from "@/types/dtos"
import { Separator } from "./ui/separator"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { toast } from "./ui/toast"

export function ProjectCard({ project }: ProjectCardProps) {
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editProjectMenuOpen, setEditProjectMenuOpen] = useState(false)
  const deleteProject = useDeleteProject()
  const updateProject = useUpdateProject()

  return (
    <div className="w-full">
      <ContextMenu>
        <ContextMenuTrigger>
          <InfoCard project={project} />
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={() => setEditProjectMenuOpen(true)}>
            <Pencil size={20} />
            Edit
          </ContextMenuItem>
          <Separator />
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
          setDeleteOpen(false)
          toast.promise(deleteProject.mutateAsync(project.id), {
            loading: `Deleting Project`,
            success: `Project Deleted`,
            error: `Failed to Delete Project`,
          })
        }}
      />

      <EditProject
        open={editProjectMenuOpen}
        onOpenChange={setEditProjectMenuOpen}
        onConfirm={(updatedProjectData: UpdateProjectDTO) => {
          setEditProjectMenuOpen(false)
          toast.promise(
            updateProject.mutateAsync({
              id: project.id,
              ...updatedProjectData,
            }),
            {
              loading: `Updating Project`,
              success: `Project Updated`,
              error: `Failed to Update Project`,
            }
          )
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
        <Link to={`/projects/${project.id}`} className="w-full">
          <Button>View Project</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
