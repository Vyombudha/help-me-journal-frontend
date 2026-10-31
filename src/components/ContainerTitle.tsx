import { useEffect } from "react"
import {
  BlockNoteSchema,
  createHeadingBlockSpec,
  type PartialBlock,
} from "@blocknote/core"
import { useCreateBlockNote } from "@blocknote/react"
import { BlockNoteView } from "@blocknote/shadcn"
import { useDebouncedCallback } from "use-debounce"
import { useUpdatePageTitle } from "@/hooks/usePageMutations"
import "@blocknote/core/fonts/inter.css"
import "@blocknote/shadcn/style.css"

function parseContent(content: string | undefined): PartialBlock[] | undefined {
  if (!content) return undefined
  try {
    const parsed = JSON.parse(content)
    return Array.isArray(parsed) && parsed.length ? parsed : undefined
  } catch {
    return undefined
  }
}

export function ContainerTitle({
  pageId,
  title,
}: {
  pageId: string
  title: string | undefined
}) {
  const save = useUpdatePageTitle()
  const editor = useCreateBlockNote({
    schema: BlockNoteSchema.create().extend({
      blockSpecs: {
        heading: createHeadingBlockSpec({
          levels: [1],
          allowToggleHeadings: false,
        }),
      },
    }),
    initialContent: parseContent(title) ?? [
      { type: "heading", props: { level: 1 } },
    ],
  })

  const debouncedSave = useDebouncedCallback(() => {
    // read at save time, so it's always post-normalization
    save.mutate({ pageId: pageId, newTitle: JSON.stringify(editor.document) })
  }, 800)

  useEffect(() => () => debouncedSave.flush(), [debouncedSave])

  const handleChange = () => {
    const first = editor.document[0]

    // collect first, update after (don't mutate while traversing)
    const extras: typeof editor.document = []
    editor.forEachBlock((block) => {
      if (block.id !== first?.id && block.type === "heading") extras.push(block)
      return true
    })
    for (const block of extras) editor.updateBlock(block, { type: "paragraph" })

    if (first && first.type !== "heading") {
      editor.updateBlock(first, { type: "heading", props: { level: 1 } })
    }

    debouncedSave()
  }

  return (
    <BlockNoteView
      editor={editor}
      theme="dark"
      slashMenu={false}
      formattingToolbar={false}
      sideMenu={false}
      shadCNComponents={{/* same as yours */}}
      onChange={handleChange}
    />
  )
}
