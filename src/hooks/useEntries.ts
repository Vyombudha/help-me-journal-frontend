import { useQuery } from "@tanstack/react-query"
import { api } from "../lib/api"
import type { EntryDTO, SuccessResponse } from "@/types/dtos"

export function useEntries(containerId: string) {
  return useQuery({
    queryKey: ["entries"],
    queryFn: async () => {
      const { data } = await api.get<SuccessResponse<EntryDTO[]>>(
        `/containers/${containerId}/entries`
      )
      return data.data
    },
  })
}
