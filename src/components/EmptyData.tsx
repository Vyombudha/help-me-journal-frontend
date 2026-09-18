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

export function EmptyData({ dataName }: EmptyDataProps) {
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
        <Button>Create {dataName}</Button>
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
    </Empty>
  )
}
