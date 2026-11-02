import { useQuery } from "@tanstack/react-query"
import { api } from "../lib/api"
import type { PageDTO, SuccessResponse } from "@/types/dtos"

export function usePages(workspaceId: string) {
  return useQuery({
    queryKey: ["pages", workspaceId],
    queryFn: async () => {
      const { data } =
        await api.get<SuccessResponse<Omit<PageDTO, "content">[]>>(
          `/workspaces/${workspaceId}/pages`
        )
      return data.data
    },
    enabled: !!workspaceId,
  })
}

export function usePage(pageId: string) {
  return useQuery({
    queryKey: ["page", pageId],
    queryFn: async () => {
      const { data } = await api.get<SuccessResponse<PageDTO>>(
        `/pages/${pageId}`
      )
      return data.data
    },
    enabled: !!pageId,
  })
}
