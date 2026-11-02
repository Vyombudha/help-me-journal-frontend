import { useEffect, useRef, useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import { useUpdatePageTitle } from "@/hooks/usePageMutations"

type StoredBlock = {
  id?: string
  content?: { type: string; text?: string }[]
}

// Pull the plain text and block id out of the stored BlockNote JSON
function readTitle(raw: string | undefined): { text: string; id?: string } {
  if (!raw) return { text: "" }
  try {
    const blocks = JSON.parse(raw) as StoredBlock[]
    const first = Array.isArray(blocks) ? blocks[0] : undefined
    const text = (first?.content ?? []).map((c) => c.text ?? "").join("")
    return { text, id: first?.id }
  } catch {
    return { text: raw } // legacy: plain-string titles
  }
}

// Write it back in the same shape BlockNote used, so other readers still work
function writeTitle(text: string, id?: string) {
  return JSON.stringify([
    {
      id: id ?? crypto.randomUUID(),
      type: "heading",
      props: {
        textColor: "default",
        backgroundColor: "default",
        textAlignment: "left",
        level: 1,
      },
      content: text ? [{ type: "text", text, styles: {} }] : [],
      children: [],
    },
  ])
}

export function ContainerTitle({
  pageId,
  title,
}: {
  pageId: string
  title: string | undefined
}) {
  const save = useUpdatePageTitle()
  const [initial] = useState(() => readTitle(title))
  const [value, setValue] = useState(initial.text)
  const latest = useRef(initial.text)
  const debouncedSave = useDebouncedCallback(() => {
    save.mutate({
      pageId,
      newTitle: writeTitle(latest.current, initial.id),
    })
  }, 800)

  // flush a pending save when leaving the page
  useEffect(() => () => debouncedSave.flush(), [debouncedSave])

  return (
    <input
      value={value}
      placeholder="Untitled Page"
      aria-label="Page title"
      onChange={(e) => {
        latest.current = e.target.value
        setValue(e.target.value)
        debouncedSave()
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") e.preventDefault()
      }}
      className="w-full bg-transparent font-[Inter,sans-serif] text-5xl leading-tight font-bold text-foreground outline-none placeholder:text-muted-foreground"
    />
  )
}
