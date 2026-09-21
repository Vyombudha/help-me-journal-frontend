import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { CreateContainerProps } from "@/types/CreateContainer.types"
import { useState } from "react"
import { MoodsGroups } from "./MoodsGroup"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { ContainerType, Mood } from "@/types/dtos"

const items: { label: string; value: ContainerType }[] = [
  { label: "Journal", value: "JOURNAL" },
  { label: "Note", value: "TECHNICAL_NOTE" },
]
export default function CreateContainer({
  open,
  onOpenChange,
  onConfirm,
}: CreateContainerProps) {
  const [moods, setMoods] = useState<Mood[]>([])
  const [type, setType] = useState<ContainerType>("JOURNAL")

  function handleSubmission(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const title = formData.get("name") as string
    console.log({ title, moods, type })
    onConfirm({ title, moods, type })
    onOpenChange(false) // close the dialog after confirming
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>New Journal/Note</DialogTitle>
          <DialogDescription>
            Put the name and description of your new journal/note here. Click
            save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <form id="new-container-form" onSubmit={handleSubmission}>
          <FieldGroup>
            <Field>
            <Label htmlFor="name-1">Title</Label>
              <Input id="name-1" name="name" defaultValue="Privacy Drive" />
            </Field>
            <Field>
              <Select
                value={type}
                onValueChange={(value) => setType(value ?? "JOURNAL")}
              >
                <SelectTrigger className="w-45">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {items.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <Label htmlFor="moods-1">Moods</Label>
              <MoodsGroups moods={moods} onChange={setMoods} />
            </Field>
          </FieldGroup>
        </form>

        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button type="submit" form="new-container-form">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
