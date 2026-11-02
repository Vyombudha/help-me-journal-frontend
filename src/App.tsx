import { Show } from "@clerk/react"
import { useApiAuth } from "./lib/useApiAuth"
import ProjectPage from "./pages/ProjectPage"
import { Route, Routes } from "react-router-dom"
import DefaultPageRedirect from "./components/DefaultPageRedirect"
import RenderContainerData from "./components/RenderContainerData"
import { lazy } from "react"

const LandingPage = lazy(() => import("./pages/LandingPage"))

export function App() {
  useApiAuth()

  return (
    <div className="h-screen w-screen bg-background">
      <Show when="signed-out">
        <LandingPage />
      </Show>
      <Show when="signed-in">
        <Routes>
          <Route path="/" element={<ProjectPage />}>
            <Route path="" element={<DefaultPageRedirect />} />
            <Route path="/w/:workspaceId" element={<DefaultPageRedirect />} />
            <Route
              path="/w/:workspaceId/p/:pageId"
              element={<RenderContainerData />}
            />
          </Route>
        </Routes>
      </Show>
    </div>
  )
}

export default App
