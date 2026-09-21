import { useEntries } from "@/hooks/useEntries"
import EntryCard from "./EntryCard"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useParams } from "react-router-dom"
import { useContainers } from "@/hooks/useContainers"
const RenderEntries = () => {
  const { containerId } = useParams<{ containerId: string }>()
  const { projectId } = useParams<{ projectId: string }>()
  const { data: containers } = useContainers(projectId!)
  const { data: entries } = useEntries(containerId!)

  return (
    <div className="flex w-full flex-col gap-4 px-16 py-12">
      <header>
        {containers && (
          <ContainerHeading
            key={containerId}
            title={containers.find((c) => c.id === containerId)?.title}
          />
        )}
      </header>
      <main className="m-8">
        {entries &&
          entries.map((e) => (
            <EntryCard title={e.title} content={e.content} key={e.id} />
          ))}
      </main>
    </div>
  )
}

function ContainerHeading({ title }: { title: string | undefined }) {
  const titleEditor = useEditor({
    extensions: [StarterKit],
    content: title ?? "Title",
    immediatelyRender: false,
  })

  if (!titleEditor) return null

  return (
    <div className="m-8 flex max-w-2xl flex-col justify-between gap-8">
      <EditorContent
        editor={titleEditor}
        className="min-h-72px max-w-full min-w-2/3 rounded-2xl border border-zinc-700 p-4 text-4xl transition-colors duration-150 focus-within:border-zinc-400 [&_.ProseMirror]:outline-none [&_.ProseMirror]:focus:outline-none [&_.ProseMirror]:focus-visible:outline-none"
      />
    </div>
  )
}

export default RenderEntries
