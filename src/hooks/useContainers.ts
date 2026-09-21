import { useQuery } from "@tanstack/react-query"
import { api } from "../lib/api"
import type { ContainerDTO, SuccessResponse } from "@/types/dtos"

export function useContainers(projectId: string) {
  return useQuery({
    queryKey: ["containers", projectId],
    queryFn: async () => {
      const { data } = await api.get<SuccessResponse<ContainerDTO[]>>(
        `/projects/${projectId}/containers`
      )
      return data.data
    },
    enabled: !!projectId,
  })
}
