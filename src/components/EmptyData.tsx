import { IconFolderCode } from "@tabler/icons-react"
import { ArrowUpRightIcon } from "lucide-react"

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
          <EmptyTitle className="text-3xl">No {dataName} Yet</EmptyTitle>
          <EmptyDescription className="text-xl">
            You haven&apos;t created any {dataName} yet. Get started by creating
            your first {dataName}.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row justify-center gap-2">
          <Button onClick={() => setNewProjectMenuOpen(true)} size={"lg"}>
            Create {dataName}
          </Button>
        </EmptyContent>
        <Button
          variant="link"
          className="text-muted-foreground"
          size="sm"
          nativeButton={false}
          render={
            <a href="#">
              Learn More <ArrowUpRightIcon />
            </a>
          }
        />
        {dataName === "project" ? (
          <CreateProject
            open={newProjectMenuOpen}
            onOpenChange={setNewProjectMenuOpen}
            onConfirm={(newProjectData: CreateProjectDTO) =>
              createProject.mutate(newProjectData, {
                onSuccess: () => setNewProjectMenuOpen(false),
              })
            }
          />
        ) : (
          <CreateContainer
            open={newProjectMenuOpen}
            onOpenChange={setNewProjectMenuOpen}
            onConfirm={(newContainerData: CreateContainerDTO) =>
              createContainer.mutate(newContainerData, {
                onSuccess: () => setNewProjectMenuOpen(false),
              })
            }
          />
        )}
      </Empty>
    </div>
  )
}
