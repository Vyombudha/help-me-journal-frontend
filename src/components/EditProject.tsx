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
import type { UpdateProjectProps } from "@/types/EditProject.types"

export default function EditProject({
  open,
  onOpenChange,
  onConfirm,
}: UpdateProjectProps) {
  function handleSubmission(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newName = formData.get("name") as string
    const newDescription = formData.get("description") as string
    onConfirm({ newName, newDescription })
    onOpenChange(false) // close the dialog after confirming
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Update Project</DialogTitle>
          <DialogDescription>
            Put the updated name and description of your project here. Click save
            when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <form id="update-project-form" onSubmit={handleSubmission}>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">New Name</Label>
              <Input id="name-1" name="name" defaultValue="Privacy Drive - v2" />
            </Field>
            <Field>
              <Label htmlFor="description-1">New Description</Label>
              <Input
                id="description-1"
                name="description"
                defaultValue="A clone of google drive made in go lang and vue.js for frontend"
              />
            </Field>
          </FieldGroup>
        </form>

        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button type="submit" form="update-project-form">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
