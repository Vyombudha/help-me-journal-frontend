import { useProjects } from "@/hooks/useProjects"
import { ProjectCard } from "@/components/ProjectCard"
import { EmptyData } from "@/components/EmptyData"
export default function RenderProjects() {
  const { data: projects, isLoading, isError } = useProjects()
  return (
    <>
      {isError && <h1 className="text-red-700">ERROR</h1>}
      {projects && projects.length === 0 && <EmptyData dataName="project" />}
      {isLoading && <h1>Loading...</h1>}
      {projects &&
        projects.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
    </>
  )
}
