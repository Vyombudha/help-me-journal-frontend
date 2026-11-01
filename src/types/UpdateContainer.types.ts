import type { UpdatePageTitleDTO } from "./dtos"

export type UpdateContainerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (newContainerData: UpdatePageTitleDTO) => void
}
