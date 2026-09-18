import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { ClerkProvider } from "@clerk/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
const queryClient = new QueryClient()
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ClerkProvider>
          <App />
        </ClerkProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
)
