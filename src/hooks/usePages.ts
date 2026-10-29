import { useQuery } from "@tanstack/react-query"
import { api } from "../lib/api"
import type { PageDTO, SuccessResponse } from "@/types/dtos"

export function usePages(workspaceId: string) {
  return useQuery({
    queryKey: ["pages", workspaceId],
    queryFn: async () => {
      const { data } = await api.get<SuccessResponse<PageDTO[]>>(
        `/workspaces/${workspaceId}/pages`
      )
      return data.data
    },
    enabled: !!workspaceId,
  })
}
