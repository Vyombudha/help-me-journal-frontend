import { useState } from "react"
import { SideBar } from "@/components/SideBar"
import { Routes, Route } from "react-router-dom"
import { UserButton } from "@clerk/react"
import { Input } from "@/components/ui/input"
import ContainersWrapper from "@/components/RenderContainers"
import RenderContainerData from "@/components/RenderContainerData"

function ProjectPage() {
  const [sideBarOpen, setSideBarOpen] = useState(false)
  const [newMenuOpen, setNewMenuOpen] = useState(false)
  const [search, setSearch] = useState("")

  return (
    <>
      <SideBar open={sideBarOpen} onOpenChange={setSideBarOpen} />
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex h-full w-full flex-col rounded-3xl bg-background p-8">
          <header className="flex flex-col items-center justify-between gap-16 p-8 md:flex-row-reverse lg:flex-row-reverse">
            <div className="flex w-full flex-row items-center justify-between md:w-fit md:gap-8 lg:w-fit lg:gap-8">
              <UserButton />
            </div>
            <Input
              className="h-full w-full md:w-1/3 lg:w-1/3"
              type="search"
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
              placeholder="Search Journals/Notes..."
            />
          </header>
          <Routes>
            <Route
              index
              element={
                <ContainersWrapper
                  search={search}
                  setNewContainerMenuOpen={setNewMenuOpen}
                  newContainerMenuOpen={newMenuOpen}
                />
              }
            />
            <Route
              path="containers/:containerId"
              element={<RenderContainerData />}
            />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default ProjectPage
