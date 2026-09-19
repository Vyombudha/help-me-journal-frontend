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
import type { CreateProjectDTO } from "@/types/dtos"

export function EmptyData({ dataName }: EmptyDataProps) {
  const [newProjectMenuOpen, setNewProjectMenuOpen] = useState(false)
  const createProject = useCreateProject()
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconFolderCode />
        </EmptyMedia>
        <EmptyTitle>No {dataName} Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any {dataName} yet. Get started by creating
          your first {dataName}.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <Button onClick={() => setNewProjectMenuOpen(true)}>
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

      <CreateProject
        open={newProjectMenuOpen}
        onOpenChange={setNewProjectMenuOpen}
        onConfirm={(newProjectData: CreateProjectDTO) =>
          createProject.mutate(newProjectData, {
            onSuccess: () => setNewProjectMenuOpen(false),
          })
        }
      />
    </Empty>
  )
}
