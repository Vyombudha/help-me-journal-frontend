import { useParams } from "react-router-dom"
import { usePages } from "@/hooks/usePages"
import { EntryCard } from "./EntryCard"
import { ContainerTitle } from "./ContainerTitle"

const RenderContainerData = () => {
  const { pageId } = useParams<{ pageId: string }>()
  const { workspaceId } = useParams<{ workspaceId: string }>()
  const { data: pages } = usePages(workspaceId!)

  return (
    <div className="sm-m-0 flex h-full w-full flex-col gap-4">
      <ContainerTitle
        pageId={pageId!}
        title={pages?.find((page) => page.id === pageId)?.title}
      />
      <EntryCard
        pageId={pageId!}
        content={pages?.find((page) => page.id === pageId)?.content}
      />
    </div>
  )
}

export default RenderContainerData
