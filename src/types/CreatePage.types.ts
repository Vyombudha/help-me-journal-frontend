import type { CreatePageDTO, Mood } from "./dtos"

export type CreatePageProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (newContainerData: CreatePageDTO) => void
}

export type MoodsGroupProps = {
  moods: Mood[]
  onChange: (value: Mood[]) => void
}
