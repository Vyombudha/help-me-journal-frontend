import type { UpdateContainerTitleDTO } from "./dtos"

export type UpdateContainerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (newContainerData: UpdateContainerTitleDTO) => void
}
