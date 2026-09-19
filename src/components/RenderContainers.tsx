import { EmptyData } from "@/components/EmptyData"
import { useContainers } from "@/hooks/useContainers"
import { useParams } from "react-router-dom"
import { ContainerCard } from "./ContainerCard"

export default function RenderContainers() {
  const { projectId } = useParams<{ projectId: string }>()

  const { data: containers, isLoading, isError } = useContainers(projectId!)
  return (
    <>
      {isError && <h1 className="text-red-700">ERROR</h1>}
      {containers && containers.length === 0 && (
        <EmptyData dataName="journal/note" />
      )}
      {isLoading && <h1>Loading...</h1>}
      {containers &&
        containers.map((container) => (
          <ContainerCard container={container} key={container.id} />
        ))}
    </>
  )
}
