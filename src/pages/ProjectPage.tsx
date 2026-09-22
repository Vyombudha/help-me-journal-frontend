import { useState } from "react"
import { SideBar } from "@/components/SideBar"
import { Routes, Route, useMatch } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { UserButton } from "@clerk/react"
import { Input } from "@/components/ui/input"
import ContainersWrapper from "@/components/RenderContainers"
import RenderEntries from "@/components/RenderEntries"
import { useCreateEntry } from "@/hooks/useEntryMutations"

function ProjectPage() {
  const [sideBarOpen, setSideBarOpen] = useState(false)
  const [newMenuOpen, setNewMenuOpen] = useState(false)
  const match = useMatch("/projects/:projectId/containers/:containerId")
  const containerId = match?.params.containerId // string | undefined
  const newEntityName = containerId ? "Entry" : "Container"
  const createEntry = useCreateEntry(containerId!)
  function handleNewBtnClick() {
    if (!containerId) {
      return () => setNewMenuOpen(true)
    }
    return () => createEntry.mutate({ title: "", content: "" })
  }
  return (
    <>
      <SideBar open={sideBarOpen} onOpenChange={setSideBarOpen} />
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex h-full w-full flex-col rounded-3xl bg-background p-8">
          <header className="flex flex-col items-center justify-between gap-16 p-8 md:flex-row-reverse lg:flex-row-reverse">
            <div className="flex w-full flex-row items-center justify-between md:w-fit md:gap-8 lg:w-fit lg:gap-8">
              <Button onClick={handleNewBtnClick()} size={"lg"}>
                <Plus /> New {newEntityName}
              </Button>
              <UserButton />
            </div>
            <Input
              className="h-full w-full md:w-1/3 lg:w-1/3"
              type="search"
              placeholder="Search Journals/Notes..."
            />
          </header>
          <Routes>
            <Route
              index
              element={
                <ContainersWrapper
                  setNewContainerMenuOpen={setNewMenuOpen}
                  newContainerMenuOpen={newMenuOpen}
                />
              }
            />
            <Route path="containers/:containerId" element={<RenderEntries />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default ProjectPage
