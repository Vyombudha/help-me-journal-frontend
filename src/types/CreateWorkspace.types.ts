import type { CreateWorkspaceDTO } from "./dtos"

export type CreateWorkspaceProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (newWorkspaceData: CreateWorkspaceDTO) => void
}
