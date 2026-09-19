import type { CreateContainerDTO, Mood } from "./dtos"

export type CreateContainerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (newContainerData: CreateContainerDTO) => void
}

export type MoodsGroupProps = {
  moods: Mood[]
  onChange: (value: Mood[]) => void
}
