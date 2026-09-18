import { Show, SignInButton } from "@clerk/react"
import { useApiAuth } from "./lib/useApiAuth"
import { Button } from "./components/ui/button"
import HomePage from "./pages/HomePage"

export function App() {
  useApiAuth() // interceptor to attach the AuthTokens at Root level

  return (
    <div className="flex h-screen w-screen justify-center bg-background p-6">
      <Show when="signed-out">
        <SignInButton>
          <Button>Sign In</Button>
        </SignInButton>
      </Show>

      <Show when="signed-in">
        <HomePage />
      </Show>
    </div>
  )
}

export default App
