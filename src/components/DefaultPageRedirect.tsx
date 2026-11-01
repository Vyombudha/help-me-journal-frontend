import { Navigate, useParams } from "react-router-dom"
import { useWorkspaces } from "@/hooks/useWorkspaces"
import { usePages } from "@/hooks/usePages"
import { Skeleton } from "./ui/skeleton"
import { EmptyData } from "./EmptyData"

function DefaultPageRedirect() {
  const { workspaceId: urlWorkspaceId } = useParams<{ workspaceId: string }>()
  const { data: workspaces, isLoading: loadingWorkspaces } = useWorkspaces()

  // 1. Work out the workspace first (before it's used below)
  const workspaceId =
    workspaces?.find((ws) => ws.id === urlWorkspaceId)?.id ??
    workspaces?.find((ws) => ws.isDefault)?.id ??
    workspaces?.[0]?.id

  // 2. Only fetch pages once we know the workspace
  const { data: pages, isLoading: loadingPages } = usePages(workspaceId!)

  // 3. Wait for both
  if (loadingWorkspaces || (workspaceId && loadingPages)) {
    return <Skeleton />
  }

  if (!workspaceId) {
    return <p className="p-4">No workspace found.</p>
  }

  // 4. Pages come back oldest-first, so [0] is the Welcome page
  const firstPage = pages?.[0]
  if (!firstPage) {
    return <EmptyData workspaceId={workspaceId} />
  }

  return <Navigate to={`/w/${workspaceId}/p/${firstPage.id}`} replace />
}

export default DefaultPageRedirect
