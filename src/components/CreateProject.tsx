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
import type { CreateProjectProps } from "@/types/CreateProject.types"
export default function CreateProject({
  open,
  onOpenChange,
  onConfirm,
}: CreateProjectProps) {
  function handleSubmission(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const description = formData.get("description") as string

    onConfirm({ name, description })
    onOpenChange(false) // close the dialog after confirming
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>New Project</DialogTitle>
          <DialogDescription>
            Put the name and description of your new project here. Click save
            when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <form id="new-project-form" onSubmit={handleSubmission}>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="Privacy Drive" />
            </Field>
            <Field>
              <Label htmlFor="description-1">Description</Label>
              <Input
                id="description-1"
                name="description"
                defaultValue="A clone of google drive made in go lang"
              />
            </Field>
          </FieldGroup>
        </form>

        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button type="submit" form="new-project-form">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
