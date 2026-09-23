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

  const [search, setSearch] = useState("")

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex h-full w-full flex-col rounded-3xl bg-background p-8">
        <header className="flex flex-col items-center justify-between gap-16 p-8 md:flex-row-reverse lg:flex-row-reverse">
          <div className="flex w-full flex-row items-center justify-between md:w-fit md:gap-8 lg:w-fit lg:gap-8">
            <Button onClick={() => setNewProjectMenuOpen(true)} size={"lg"}>
              <Plus /> New Project
            </Button>
            <UserButton />
          </div>
          <Input
            className="h-full w-full md:w-1/3 lg:w-1/3"
            type="search"
            placeholder="Search Projects..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </header>

        <main className="grid flex-1 scrollbar-none grid-cols-1 content-start gap-8 overflow-y-auto px-4 py-8 md:grid-cols-2 lg:grid-cols-4">
          <RenderProjects search={search.toLowerCase()} />
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
