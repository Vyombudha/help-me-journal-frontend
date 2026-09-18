import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { UserButton } from "@clerk/react"
import { Plus } from "lucide-react"
import { useProjects } from "@/hooks/useProjects"
import { ProjectCard } from "@/components/ProjectCard"
import { EmptyData } from "@/components/EmptyData"

export default function HomePage() {
  const { data: projects, isLoading, isError } = useProjects()
  return (
    <div className="min:w-full h-full rounded-4xl bg-primary-foreground lg:w-9/10">
      <header className="flex flex-row items-center justify-between gap-16 px-8 py-12">
        <Input
          className="h-full max-w-1/3"
          type="search"
          placeholder="Search Projects..."
        />
        <div className="flex flex-row items-center justify-between gap-8">
          <Button>
            <Plus /> New Project
          </Button>
          <UserButton />
        </div>
      </header>

      {isError && <h1 className="text-red-700">ERROR</h1>}
      {projects && projects.length === 0 && <EmptyData dataName="project" />}
      <main className="min:grid-cols-1 grid gap-16 px-4 py-8 md:grid-cols-2 lg:grid-cols-4">
        {isLoading && <h1>Loading...</h1>}
        {projects &&
          projects.map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
      </main>
    </div>
  )
}
