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
import type { UpdateContainerProps } from "@/types/UpdateContainer.types"

export default function EditContainer({
  open,
  onOpenChange,
  onConfirm,
}: UpdateContainerProps) {
  function handleSubmission(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newTitle = formData.get("name") as string
    onConfirm({ newTitle, newMoods: undefined })
    onOpenChange(false) // close the dialog after confirming
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Update Project</DialogTitle>
          <DialogDescription>
            Put the updated name and description of your project here. Click
            save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <form id="update-container-form" onSubmit={handleSubmission}>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">New Title</Label>
              <Input
                id="name-1"
                name="name"
                defaultValue="Privacy Drive - v2"
              />
            </Field>
          </FieldGroup>
        </form>

        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button type="submit" form="update-container-form">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
