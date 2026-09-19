import type { UpdateContainerDTO } from "./dtos"

export type UpdateContainerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (newContainerData: UpdateContainerDTO) => void
}
