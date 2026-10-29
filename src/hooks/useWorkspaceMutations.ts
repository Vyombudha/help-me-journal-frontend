import { api } from "@/lib/api"
import {
  type CreateWorkspaceDTO,
  type SuccessResponse,
  type UpdateWorkspaceDTO,
  type WorkspaceDTO,
} from "@/types/dtos"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useCreateWorkspace() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (newWorkspace: CreateWorkspaceDTO) => {
      const { data } = await api.post<SuccessResponse<WorkspaceDTO>>(
        "/workspaces",
        newWorkspace
      )
      return data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] })
    },
  })
}

export function useUpdateWorkspace() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      id,
      ...updatedWorkspace
    }: UpdateWorkspaceDTO & { id: string }) => {
      const { data } = await api.patch<SuccessResponse<WorkspaceDTO>>(
        `/workspaces/${id}`,
        updatedWorkspace
      )
      return data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] })
    },
  })
}

export function useDeleteWorkspace() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.delete<SuccessResponse<WorkspaceDTO>>(
        `/workspaces/${id}`
      )
      return data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] })
    },
  })
}
