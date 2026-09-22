import { createRoot } from "react-dom/client"
import { shadcn } from "@clerk/themes"
import { Toaster } from "@/components/ui/toast"
import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { ClerkProvider } from "@clerk/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter } from "react-router-dom"
const queryClient = new QueryClient()
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ClerkProvider appearance={shadcn}>
          <App />
          <Toaster />
        </ClerkProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </BrowserRouter>
)
