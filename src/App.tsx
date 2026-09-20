import { Show, SignInButton } from "@clerk/react"
import { useApiAuth } from "./lib/useApiAuth"
import { Button } from "./components/ui/button"
import HomePage from "./pages/HomePage"
import { Route, Routes } from "react-router-dom"
import ProjectPage from "./pages/ProjectPage"
export function App() {
  useApiAuth() // interceptor to attach the AuthTokens at Root level
  return (
    <div className="h-screen w-screen bg-background">
      <Show when="signed-out">
        <SignInButton>
          <Button>Sign In</Button>
        </SignInButton>
      </Show>
      <Show when="signed-in">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:projectId/*" element={<ProjectPage />} />
        </Routes>
      </Show>
    </div>
  )
}

export default App
