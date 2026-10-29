import { useEffect } from "react"
import type { Block, PartialBlock } from "@blocknote/core"
import { useCreateBlockNote } from "@blocknote/react"
import { BlockNoteView } from "@blocknote/shadcn"
import { useDebouncedCallback } from "use-debounce"
import { useUpdatePageContent } from "@/hooks/usePageMutations"
import "@blocknote/core/fonts/inter.css"
import "@blocknote/shadcn/style.css"
import * as Badge from "@/components/ui/badge"
import * as Button from "@/components/ui/button"
import * as DropdownMenu from "@/components/ui/dropdown-menu"
import * as Input from "@/components/ui/input"
import * as Label from "@/components/ui/label"
import * as Popover from "@/components/ui/popover"
import * as Select from "@/components/ui/select"
import * as Tabs from "@/components/ui/tabs"
import * as Toggle from "@/components/ui/toggle"
import * as Tooltip from "@/components/ui/tooltip"
import type { EntryCardProps } from "@/types/EntryCard.types"

function parseContent(content: string | undefined): PartialBlock[] | undefined {
  if (!content) return undefined
  try {
    const parsed = JSON.parse(content)
    return Array.isArray(parsed) && parsed.length ? parsed : undefined
  } catch {
    return undefined
  }
}

export function EntryCard({ containerId, content }: EntryCardProps) {
  const save = useUpdatePageContent()
  const editor = useCreateBlockNote({ initialContent: parseContent(content) })

  const debouncedSave = useDebouncedCallback((blocks: Block[]) => {
    console.log(blocks)
    save.mutate({ pageId: containerId, newContent: JSON.stringify(blocks) })
  }, 800)

  // don't lose a pending save when switching containers
  useEffect(() => () => debouncedSave.flush(), [debouncedSave])
  return (
    <BlockNoteView
      editor={editor}
      theme="dark"
      shadCNComponents={{
        Badge,
        Button,
        DropdownMenu,
        Input,
        Label,
        Popover,
        Select,
        Tabs,
        Toggle,
        Tooltip,
      }}
      onChange={() => debouncedSave(editor.document)}
    />
  )
}
