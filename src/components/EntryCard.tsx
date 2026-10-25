import { useEffect, useState } from "react"
import { useUpdateEntry } from "@/hooks/useEntryMutations"
import type { EntryCardProps } from "@/types/EntryCard.types"
import { useDebouncedCallback } from "use-debounce"

import "@blocknote/core/fonts/inter.css"
import { useCreateBlockNote } from "@blocknote/react"
import { BlockNoteView } from "@blocknote/shadcn"
import "@blocknote/shadcn/style.css"

const stripHtml = (s: string) =>
  new DOMParser().parseFromString(s ?? "", "text/html").body.textContent ?? ""

export default function EntryCard({ title, content, entryId }: EntryCardProps) {
  const updateEntry = useUpdateEntry()
  const [titleText, setTitleText] = useState(() => stripHtml(title ?? ""))
  const editor = useCreateBlockNote()

  const debouncedSave = useDebouncedCallback(
    (newTitle?: string, newContent?: string) => {
      updateEntry.mutate({ newTitle, newContent, entryId })
    },
    600
  )

  // Load saved content once: new format is JSON blocks, old entries are HTML
  useEffect(() => {
    let cancelled = false
    async function load() {
      if (!content) return
      try {
        const parsed = JSON.parse(content)
        if (Array.isArray(parsed) && parsed.length > 0) {
          editor.replaceBlocks(editor.document, parsed)
        }
      } catch {
        const blocks = await editor.tryParseHTMLToBlocks(content)
        if (!cancelled) editor.replaceBlocks(editor.document, blocks)
      }
    }
    load()
    return () => {
      cancelled = true
    }
    // intentionally not depending on `content`, or saves would reload the editor mid-typing
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, entryId])

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12">
      <input
        value={titleText}
        onChange={(e) => {
          setTitleText(e.target.value)
          debouncedSave(e.target.value, undefined)
        }}
        placeholder="Untitled"
        className="mb-6 w-full bg-transparent text-4xl font-bold outline-none placeholder:text-zinc-600"
      />
      <BlockNoteView
        editor={editor}
        onChange={() =>
          debouncedSave(undefined, JSON.stringify(editor.document))
        }
      />
    </div>
  )
}
