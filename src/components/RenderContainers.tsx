import { EmptyData } from "@/components/EmptyData"
import { useContainers } from "@/hooks/useContainers"
import { useParams } from "react-router-dom"
import { ContainerCard } from "./ContainerCard"

export default function ContainersWrapper() {
  return (
    <main className="min:grid-cols-1 grid flex-1 scrollbar-none content-start gap-16 overflow-y-auto px-4 py-8 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4">
      <RenderContainers />
    </main>
  )
}

function RenderContainers() {
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
