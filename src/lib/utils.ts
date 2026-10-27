export { cn } from "cn"

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
