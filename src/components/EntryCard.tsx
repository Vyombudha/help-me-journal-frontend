import { useUpdateEntry } from "@/hooks/useEntryMutations"
import type { EntryCardProps } from "@/types/EntryCard.types"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

export default function EntryCard({ title, content, entryId }: EntryCardProps) {
  const updateEditor = useUpdateEntry()
  const titleEditor = useEditor({
    extensions: [StarterKit],
    content: title,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      updateEditor.mutate({ newTitle: html, newContent: undefined, entryId })
    },
  })

  const contentEditor = useEditor({
    extensions: [StarterKit],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      updateEditor.mutate({
        newTitle: undefined,
        newContent: html,
        entryId,
      })
    },
  })

  if (!titleEditor || !contentEditor) return null

  return (
    <div className="m-8 flex max-w-2xl flex-col justify-between gap-8">
      <EditorContent
        editor={titleEditor}
        className="max-h-15 max-w-2/3 scrollbar-none overflow-y-auto rounded-2xl border border-zinc-700 p-4 text-2xl transition-colors duration-150 focus-within:border-zinc-400 [&_.ProseMirror]:outline-none [&_.ProseMirror]:focus:outline-none [&_.ProseMirror]:focus-visible:outline-none"
      />
      <EditorContent
        editor={contentEditor}
        className="min-h-70 max-w-full min-w-2/3 rounded-2xl border border-zinc-700 p-4 text-2xl transition-colors duration-150 focus-within:border-zinc-400 [&_.ProseMirror]:outline-none [&_.ProseMirror]:focus:outline-none [&_.ProseMirror]:focus-visible:outline-none"
      />
    </div>
  )
}
