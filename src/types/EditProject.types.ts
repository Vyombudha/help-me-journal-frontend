import type { UpdateProjectDTO } from "./dtos"

export type UpdateProjectProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (newProjectData: UpdateProjectDTO) => void
}
