import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { useState } from "react"
import { Trash2, Pencil } from "lucide-react"
import ConfirmDelete from "./ConfirmDelete"
import type { UpdateContainerDTO } from "@/types/dtos"
import { Separator } from "./ui/separator"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import type { ContainerCardProps } from "@/types/ContainerCard.types"
import {
  useDeleteContainer,
  useUpdateContainer,
} from "@/hooks/useContainerMutations"
import EditContainer from "./EditContainer"
import { toast } from "./ui/toast"

export function ContainerCard({ container }: ContainerCardProps) {
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editProjectMenuOpen, setEditProjectMenuOpen] = useState(false)
  const deleteContainer = useDeleteContainer()
  const updateContainer = useUpdateContainer()

  return (
    <div className="h-full w-full">
      <ContextMenu>
        <ContextMenuTrigger>
          <InfoCard container={container} />
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
          setEditProjectMenuOpen(false)
          const containerType =
            container.type === "JOURNAL" ? "Journal" : "Note"
          toast.promise(deleteContainer.mutateAsync(container.id), {
            loading: `Deleting ${containerType}`,
            success: `${containerType} Deleted`,
            error: `Failed to Delete ${containerType}`,
          })
        }}
      />

      <EditContainer
        open={editProjectMenuOpen}
        onOpenChange={setEditProjectMenuOpen}
        onConfirm={(updatedContainerData: UpdateContainerDTO) => {
          setEditProjectMenuOpen(false)
          const containerType =
            container.type === "JOURNAL" ? "Journal" : "Note"
          toast.promise(
            updateContainer.mutateAsync({
              containerId: container.id,
              ...updatedContainerData,
            }),
            {
              loading: `Creating ${containerType}`,
              success: `${containerType} Created`,
              error: `Failed to Create ${containerType}`,
            }
          )
        }}
      />
    </div>
  )
}

function InfoCard({ container }: ContainerCardProps) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-2">
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">{container.type}</Badge>
        </CardAction>
        <CardTitle>{container.title}</CardTitle>
        <CardDescription>{container.moods}</CardDescription>
      </CardHeader>

      <CardFooter>
        <Link to={`containers/${container.id}`} className="w-full">
          <Button>
            View {container.type === "JOURNAL" ? "Journal" : "Note"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
