import { useEffect } from "react"
import type { Block } from "@blocknote/core"
import { useCreateBlockNote } from "@blocknote/react"
import { BlockNoteView } from "@blocknote/mantine"
import "@blocknote/mantine/style.css"
import { useDebouncedCallback } from "use-debounce"
import { useUpdatePageContent } from "@/hooks/usePageMutations"
import "@blocknote/core/fonts/inter.css"
import { parseContent } from "@/lib/utils"

export default function EntryCard({
  pageId,
  content,
}: {
  pageId: string
  content: string
}) {
  const save = useUpdatePageContent()
  const editor = useCreateBlockNote({ initialContent: parseContent(content) })

  const debouncedSave = useDebouncedCallback((blocks: Block[]) => {
    save.mutate({ pageId: pageId, newContent: JSON.stringify(blocks) })
  }, 800)

  // don't lose a pending save when switching containers
  useEffect(() => () => debouncedSave.flush(), [debouncedSave])
  return (
    <BlockNoteView
      editor={editor}
      theme="dark"
      onChange={() => debouncedSave(editor.document)}
    />
  )
}
