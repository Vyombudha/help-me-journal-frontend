import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { UserButton } from "@clerk/react"
import { Plus } from "lucide-react"
import { useState } from "react"
import { useCreateProject } from "@/hooks/useProjectMutations"
import CreateProject from "@/components/CreateProject"
import type { CreateProjectDTO } from "@/types/dtos"
import RenderProjects from "@/components/RenderProjects"
import { toast } from "@/components/ui/toast"
export default function HomePage() {
  const [newProjectMenuOpen, setNewProjectMenuOpen] = useState(false)
  const createProject = useCreateProject()

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex h-full w-full flex-col rounded-3xl bg-background p-8">
        <header className="flex flex-row items-center justify-between gap-16 p-8">
          <Input
            className="h-full max-w-1/3"
            type="search"
            placeholder="Search Projects..."
          />
          <div className="flex flex-row items-center justify-between gap-8">
            <Button onClick={() => setNewProjectMenuOpen(true)} size={"lg"}>
              <Plus /> New Project
            </Button>
            <UserButton />
          </div>
        </header>

        <main className="min:grid-cols-1 grid flex-1 scrollbar-none content-start gap-8 overflow-y-auto px-4 py-8 md:grid-cols-2 lg:grid-cols-4">
          <RenderProjects />
        </main>
      </div>

      <CreateProject
        open={newProjectMenuOpen}
        onOpenChange={setNewProjectMenuOpen}
        onConfirm={(newProjectData: CreateProjectDTO) =>
          toast.promise(createProject.mutateAsync(newProjectData), {
            loading: "Creating Project...",
            success: "Project Created",
            error: "Failed to Create Project",
          })
        }
      />
    </div>
  )
}
