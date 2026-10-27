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
import { Trash2 } from "lucide-react"
import ConfirmDelete from "./ConfirmDelete"
import { useDeleteProject } from "@/hooks/useProjectMutations"
import { Separator } from "./ui/separator"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { toast } from "./ui/toast"

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
