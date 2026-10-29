import { useParams } from "react-router-dom"
import { useContainers } from "@/hooks/useContainers"
import { EntryCard } from "./EntryCard"
import { ContainerTitle } from "./ContainerTitle"

const RenderContainerData = () => {
  const { containerId } = useParams<{ containerId: string }>()
  const { projectId } = useParams<{ projectId: string }>()
  const { data: containers } = useContainers(projectId!)

  return (
    <div className="sm-m-0 flex h-full w-full flex-col gap-4">
      <ContainerTitle
        containerId={containerId!}
        title={containers?.find((c) => c.id === containerId)?.title}
      />
      <EntryCard
        containerId={containerId!}
        content={containers?.find((c) => c.id === containerId)?.content}
      />w
    </div>
  )
}

export default RenderContainerData
