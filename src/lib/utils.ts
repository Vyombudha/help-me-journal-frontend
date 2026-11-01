import { BlockNoteEditor, type PartialBlock } from "@blocknote/core"

export function getTitleText(content: string | undefined): string {
  if (!content) return ""
  try {
    const blocks = JSON.parse(content)
    const first = blocks?.[0]
    if (!Array.isArray(first?.content)) return ""
    return first.content
      .map((node: { type: string; text?: string }) =>
        node.type === "text" ? (node.text ?? "") : ""
      )
      .join("")
      .trim()
  } catch {
    return ""
  }
}

export const EMPTY_PAGE: PartialBlock[] = [
  { type: "heading", props: { level: 1 }, content: "Untitled Page" },
]

const converterEditor = BlockNoteEditor.create()

export async function downloadMarkdown(
  content: string | undefined | null,
  filename = "document.md"
) {
  const blocks = parseContent(content)

  if (!blocks) {
    return false
  }
  const markdown = converterEditor.blocksToMarkdownLossy(blocks)
  const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" })
  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
  return true
}
export function parseContent(
  content: string | undefined | null
): PartialBlock[] | undefined {
  if (!content) return undefined
  try {
    const parsed = JSON.parse(content)
    return Array.isArray(parsed) && parsed.length ? parsed : undefined
  } catch {
    return undefined
  }
}
