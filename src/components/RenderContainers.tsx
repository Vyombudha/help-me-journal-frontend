import { EmptyData } from "@/components/EmptyData"
import { useContainers } from "@/hooks/useContainers"
import { useParams } from "react-router-dom"
import { ContainerCard } from "./ContainerCard"
import { type Dispatch, type SetStateAction } from "react"
import { useCreateContainer } from "@/hooks/useContainerMutations"
import CreateContainer from "./CreateContainer"
import type { CreateContainerDTO } from "@/types/dtos"

export default function ContainersWrapper({
  setNewContainerMenuOpen,
  newContainerMenuOpen,
}: {
  setNewContainerMenuOpen: Dispatch<SetStateAction<boolean>>
  newContainerMenuOpen: boolean
}) {
  return (
    <main className="min:grid-cols-1 grid flex-1 scrollbar-none content-start gap-16 overflow-y-auto px-4 py-8 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4">
      <RenderContainers
        setNewContainerMenuOpen={setNewContainerMenuOpen}
        newContainerMenuOpen={newContainerMenuOpen}
      />
    </main>
  )
}

function RenderContainers({
  setNewContainerMenuOpen,
  newContainerMenuOpen,
}: {
  setNewContainerMenuOpen: Dispatch<SetStateAction<boolean>>
  newContainerMenuOpen: boolean
}) {
  const { projectId } = useParams<{ projectId: string }>()
  const createContainer = useCreateContainer(projectId!)
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

      <CreateContainer
        open={newContainerMenuOpen}
        onOpenChange={setNewContainerMenuOpen}
        onConfirm={(newContainerData: CreateContainerDTO) =>
          createContainer.mutate(newContainerData, {
            onSuccess: () => setNewContainerMenuOpen(false),
          })
        }
      />
    </>
  )
}
