import { useEntries } from "@/hooks/useEntries"
import EntryCard from "./EntryCard"

import { useParams } from "react-router-dom"
import { useContainers } from "@/hooks/useContainers"
import { useUpdateContainer } from "@/hooks/useContainerMutations"
import { useDebouncedCallback } from "use-debounce"
import { useState } from "react"
const RenderEntries = () => {
  const { containerId } = useParams<{ containerId: string }>()
  const { projectId } = useParams<{ projectId: string }>()
  const { data: containers } = useContainers(projectId!)
  const { data: entries } = useEntries(containerId!)

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
        {entries &&
          entries.map((e) => (
            <EntryCard
              title={e.title}
              content={e.content}
              key={e.id}
              entryId={e.id}
            />
          ))}
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
  const updateContainer = useUpdateContainer()
  const [value, setValue] = useState(title ?? "Title")
  const debouncedSave = useDebouncedCallback((newTitle: string) => {
    updateContainer.mutate({
      newTitle,
      containerId,
      newMoods: undefined,
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
