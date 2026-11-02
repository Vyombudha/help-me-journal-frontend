import { useParams } from "react-router-dom"
import { usePages } from "@/hooks/usePages"

import { ContainerTitle } from "./ContainerTitle"
import { Skeleton } from "./ui/skeleton"
import { EmptyData } from "./EmptyData"
import { lazy, Suspense } from "react"
const EntryCard = lazy(() => import("./EntryCard"))

const RenderContainerData = () => {
  const { pageId } = useParams<{ pageId: string }>()
  const { workspaceId } = useParams<{ workspaceId: string }>()
  const { data: pages, isLoading } = usePages(workspaceId!)
  if (isLoading) return <Skeleton /> // or a skeleton
  const page = pages?.find((p) => p.id === pageId)

  if (!pages?.length) {
    return <EmptyData workspaceId={workspaceId!} />
  }

  if (!page) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        Select a page from the sidebar.
      </div>
    )
  }

  return (
    <div
      key={page.id}
      className="flex h-full w-full flex-col gap-4 px-4 sm:px-8"
    >
      <ContainerTitle pageId={pageId!} title={page.title} />
      <Suspense fallback={<Skeleton className="h-40 w-full" />}>
        <EntryCard pageId={pageId!} content={page.content} />
      </Suspense>
    </div>
  )
}

export default RenderContainerData
