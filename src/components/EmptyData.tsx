import { IconFolderCode } from "@tabler/icons-react"

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
import type { CreatePageDTO } from "@/types/dtos"
import { useCreatePage } from "@/hooks/usePageMutations"
import { toast } from "./ui/toast"
import { useNavigate } from "react-router-dom"

// only handle Empty Workspace (i.e no pages for a workspace) but will also handle No Workspaces to later on
export function EmptyData({ workspaceId }: EmptyDataProps) {
  const newPageData: CreatePageDTO = {
    title: "New Page",
    moods: ["CALM", "HAPPY"],
  }
  const navigate = useNavigate()
  const createPage = useCreatePage(workspaceId)
  return (
    <div className="col-span-full flex h-2/3 w-full items-start">
      <Empty className="h-full w-full">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <IconFolderCode className="size-16 pb-2" />
          </EmptyMedia>
          <EmptyTitle className="text-3xl">No Page's yet</EmptyTitle>
          <EmptyDescription className="text-xl">
            You haven&apos;t created any pages' yet. Get started by creating
            your first page.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row justify-center gap-2">
          <Button
            onClick={() => {
              toast.promise(
                createPage.mutateAsync(newPageData).then((page) => {
                  navigate(`/w/${workspaceId}/p/${page.id}`)
                  return page
                }),
                {
                  loading: "Creating Page",
                  success: "Page Created",
                  error: "Failed to Create Page",
                }
              )
            }}
            size={"lg"}
          >
            create page
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  )
}
