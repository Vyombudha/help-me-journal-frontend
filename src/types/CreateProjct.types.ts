import type { CreateProjectDTO } from "./dtos"

export type CreateProjectProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (newProjectData: CreateProjectDTO) => void
}
