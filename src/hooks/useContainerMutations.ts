import { api } from "@/lib/api"
import {
  type SuccessResponse,
  type CreateContainerDTO,
  type ContainerDTO,
  type UpdateContainerDTO,
} from "@/types/dtos"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useCreateContainer(projectId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (newContainer: CreateContainerDTO) => {
      const { data } = await api.post<SuccessResponse<ContainerDTO>>(
        `/projects/${projectId}/containers`,
        newContainer
      )
      return data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["containers"] })
    },
  })
}

export function useUpdateContainer() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      containerId,
      ...updatedContainerData
    }: UpdateContainerDTO & { containerId: string }) => {
      const { data } = await api.patch<SuccessResponse<UpdateContainerDTO>>(
        `/containers/${containerId}`,
        updatedContainerData
      )
      return data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["containers"] })
    },
  })
}

export function useDeleteContainer() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (containerId: string) => {
      const { data } = await api.delete<SuccessResponse<ContainerDTO>>(
        `/containers/${containerId}`
      )
      return data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["containers"] })
    },
  })
}
