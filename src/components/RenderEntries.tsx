import { useParams } from "react-router-dom"
import { useContainers } from "@/hooks/useContainers"
import { useUpdateContainerTitle } from "@/hooks/useContainerMutations"
import { useDebouncedCallback } from "use-debounce"
import { useState } from "react"
import { EntryCard } from "./EntryCard"

const RenderEntries = () => {
  const { containerId } = useParams<{ containerId: string }>()
  const { projectId } = useParams<{ projectId: string }>()
  const { data: containers } = useContainers(projectId!)

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <header>
        {containers && (
          <ContainerHeading
            containerId={containerId!}
            key={containerId}
            title={containers.find((c) => c.id === containerId)?.title}
          />
        )}
      </header>
      <main className="h-full w-full self-end">
        <EntryCard
          containerId={containerId!}
          content={containers?.find((c) => c.id === containerId)?.content}
        />
      </main>
    </div>
  )
}

function ContainerHeading({
  title,
  containerId,
}: {
  title: string | undefined
  containerId: string
}) {
  const updateContainer = useUpdateContainerTitle()
  const [value, setValue] = useState(title ?? "")

  const debouncedSave = useDebouncedCallback((newTitle: string) => {
    updateContainer.mutate({
      newTitle,
      containerId,
    })
  }, 600)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(newValue)
    debouncedSave(newValue)
  }

  return (
    <div className="m-8 flex flex-col justify-between gap-8 sm:w-full lg:w-1/2">
      <input
        value={value}
        onChange={handleChange}
        className="min-h-72px max-w-full min-w-2/3 rounded-2xl border border-zinc-700 bg-transparent p-4 text-4xl transition-colors duration-150 outline-none focus:border-zinc-400"
      />
    </div>
  )
}

export default RenderEntries
