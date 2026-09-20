import { api } from "@/lib/api"
import {
  type SuccessResponse,
  type CreateEntryDTO,
  type UpdateEntryDTO,
  type EntryDTO,
} from "@/types/dtos"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useCreateEntry(containerId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (newEntry: CreateEntryDTO) => {
      const { data } = await api.post<SuccessResponse<EntryDTO>>(
        `/containers/${containerId}/entries`,
        newEntry
      )
      return data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["entries"] })
    },
  })
}

export function useUpdateEntry() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      entryId,
      ...updatedContainerData
    }: UpdateEntryDTO & { entryId: string }) => {
      const { data } = await api.patch<SuccessResponse<UpdateEntryDTO>>(
        `/entries/${entryId}`,
        updatedContainerData
      )
      return data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["entries"] })
    },
  })
}

export function useDeleteEntries() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (entryId: string) => {
      const { data } = await api.delete<SuccessResponse<EntryDTO>>(
        `/entries/${entryId}`
      )
      return data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["entries"] })
    },
  })
}
