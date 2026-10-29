import { useQuery } from "@tanstack/react-query"
import { api } from "../lib/api"
import type { WorkspaceDTO, SuccessResponse } from "@/types/dtos"
export function useWorkspaces() {
  return useQuery({
    queryKey: ["workspaces"],
    queryFn: async () => {
      const { data } =
        await api.get<SuccessResponse<WorkspaceDTO[]>>("/workspaces")
      return data.data
    },
  })
}
