import { useParams } from "react-router-dom"
import { usePage, usePages } from "@/hooks/usePages"

import { ContainerTitle } from "./ContainerTitle"
import { Skeleton } from "./ui/skeleton"
import { EmptyData } from "./EmptyData"
import { lazy, Suspense } from "react"
const EntryCard = lazy(() => import("./EntryCard"))

const RenderContainerData = () => {
  const { pageId } = useParams<{ pageId: string }>()
  const { workspaceId } = useParams<{ workspaceId: string }>()
  const { data: pages, isLoading } = usePages(workspaceId!)
  const { data: page, isLoading: loadingPage } = usePage(pageId!)
  if (isLoading || loadingPage) return <Skeleton />

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
      className="flex h-full w-full flex-col gap-4 px-4 sm:px-8 [&_.bn-editor]:px-0!"
    >
      <Suspense
        fallback={
          <>
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
          </>
        }
      >
        <ContainerTitle pageId={pageId!} title={page.title} />
        <EntryCard pageId={pageId!} content={page.content} />
      </Suspense>
    </div>
  )
}

export default RenderContainerData
