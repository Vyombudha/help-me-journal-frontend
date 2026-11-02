import type { PartialBlock } from "@blocknote/core"
import { api } from "@/lib/api"

type StoredBlock = {
  id?: string
  content?: { type: string; text?: string }[]
}

// Pull the plain text and block id out of the stored BlockNote JSON
export function readTitle(raw: string | undefined): string {
  if (!raw) return "Untitled Page"
  try {
    const blocks = JSON.parse(raw) as StoredBlock[]
    const first = Array.isArray(blocks) ? blocks[0] : undefined
    const text = (first?.content ?? []).map((c) => c.text ?? "").join("")
    return text
  } catch {
    return raw // legacy: plain-string titles
  }
}

export const EMPTY_PAGE: PartialBlock[] = [
  { type: "heading", props: { level: 1 }, content: "Untitled Page" },
]

export async function downloadMarkdown(
  pageId: string,
  filename = "document.md"
) {
  const { data: page } = await api.get(`/pages/${pageId}`)
  console.log(page)

  const blocks = parseContent(page.data.content)

  const { BlockNoteEditor } = await import("@blocknote/core")
  const markdown = await BlockNoteEditor.create().blocksToMarkdownLossy(blocks)

  const url = URL.createObjectURL(
    new Blob([markdown], { type: "text/markdown;charset=utf-8" })
  )
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
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
