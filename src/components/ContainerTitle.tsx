import { useEffect, useRef, useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import { useUpdatePageTitle } from "@/hooks/usePageMutations"
import { readTitle } from "@/lib/utils"

export function ContainerTitle({
  pageId,
  title,
}: {
  pageId: string
  title: string | undefined
}) {
  const save = useUpdatePageTitle()
  const [initial] = useState(() => readTitle(title))
  const [value, setValue] = useState(initial)
  const latest = useRef(initial)
  const debouncedSave = useDebouncedCallback(() => {
    console.log("NEW TITLE : ", latest.current)

    save.mutate({
      pageId,
      newTitle: latest.current,
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
