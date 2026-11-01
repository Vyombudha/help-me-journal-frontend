import type { UpdateWorkspaceDTO } from "./dtos"

export type UpdateWorkspaceProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (newProjectData: UpdateWorkspaceDTO) => void
}
