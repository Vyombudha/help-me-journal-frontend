import { useState } from "react"
import { SideBar } from "@/components/SideBar"
import { useCreateContainer } from "@/hooks/useContainerMutations"
import { Routes, useParams, Route } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { UserButton } from "@clerk/react"
import { Input } from "@/components/ui/input"
import CreateContainer from "@/components/CreateContainer"
import type { CreateContainerDTO } from "@/types/dtos"
import ContainersWrapper from "@/components/RenderContainers"

function ProjectPage() {
  const { projectId } = useParams<{ projectId: string }>()
  const [sideBarOpen, setSideBarOpen] = useState(false)
  const [newContainerMenuOpen, setNewContainerMenuOpen] = useState(false)
  const createContainer = useCreateContainer(projectId!)

  return (
    <>
      <SideBar open={sideBarOpen} onOpenChange={setSideBarOpen} />
      <div className="flex h-full w-full items-center justify-center sm:p-0 lg:p-8">
        <div className="flex h-full flex-col rounded-3xl bg-primary-foreground sm:w-screen lg:w-9/10">
          <header className="flex flex-row items-center justify-between gap-16 px-8 py-12">
            <Input
              className="h-full max-w-1/3"
              type="search"
              placeholder="Search Projects..."
            />
            <div className="flex flex-row items-center justify-between gap-8">
              <Button onClick={() => setNewContainerMenuOpen(true)} size={"lg"}>
                <Plus /> New Container
              </Button>
              <UserButton />
            </div>
          </header>
          <Routes>
            <Route index element={<ContainersWrapper />} />
            <Route
              path="containers/:containerId"
              element={<h1>Enter the Text Editor HAHA</h1>}
            />
          </Routes>
        </div>

        <CreateContainer
          open={newContainerMenuOpen}
          onOpenChange={setNewContainerMenuOpen}
          onConfirm={(newContainerData: CreateContainerDTO) =>
            createContainer.mutate(newContainerData, {
              onSuccess: () => setNewContainerMenuOpen(false),
            })
          }
        />
      </div>
    </>
  )
}

export default ProjectPage
