import { IconFolderCode } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import type { EmptyDataProps } from "@/types/EmptyData.types"
import CreateProject from "./CreateProject"
import { useCreateProject } from "@/hooks/useProjectMutations"
import { useState } from "react"
import type { CreateContainerDTO, CreateProjectDTO } from "@/types/dtos"
import CreateContainer from "./CreateContainer"
import { useParams } from "react-router-dom"
import { useCreateContainer } from "@/hooks/useContainerMutations"
import { toast } from "./ui/toast"

export function EmptyData({ dataName }: EmptyDataProps) {
  const [newProjectMenuOpen, setNewProjectMenuOpen] = useState(false)
  const createProject = useCreateProject()
  const { projectId } = useParams<{ projectId: string }>()
  const createContainer = useCreateContainer(projectId!)

  return (
    <div className="col-span-full flex h-2/3 w-full items-start">
      <Empty className="h-full w-full">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <IconFolderCode className="size-16 pb-2" />
          </EmptyMedia>
          <EmptyTitle className="text-3xl">No {dataName}s yet</EmptyTitle>
          <EmptyDescription className="text-xl">
            You haven&apos;t created any {dataName} yet. Get started by creating
            your first {dataName}.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row justify-center gap-2">
          <Button onClick={() => setNewProjectMenuOpen(true)} size={"lg"}>
            create {dataName}
          </Button>
        </EmptyContent>
        {dataName === "project" ? (
          <CreateProject
            open={newProjectMenuOpen}
            onOpenChange={setNewProjectMenuOpen}
            onConfirm={(newProjectData: CreateProjectDTO) =>
              toast.promise(createProject.mutateAsync(newProjectData), {
                loading: "Creating Project...",
                success: "Project Created",
                error: "Failed to Create Project",
              })
            }
          />
        ) : (
          <CreateContainer
            open={newProjectMenuOpen}
            onOpenChange={setNewProjectMenuOpen}
            onConfirm={(newContainerData: CreateContainerDTO) => {
              const containerType =
                newContainerData.type === "JOURNAL" ? "Journal" : "Note;"
              toast.promise(createContainer.mutateAsync(newContainerData), {
                loading: `Creating ${containerType}`,
                success: `${containerType} Created`,
                error: `Failed to Create ${containerType}`,
              })
            }}
          />
        )}
      </Empty>
    </div>
  )
}
