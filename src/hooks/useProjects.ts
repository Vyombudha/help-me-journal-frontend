import { useQuery } from "@tanstack/react-query"
import { api } from "../lib/api"
import type { ProjectDTO, SuccessResponse } from "@/types/dtos"

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data } = await api.get<SuccessResponse<ProjectDTO[]>>("/projects")
      return data.data
    },
  })
}
