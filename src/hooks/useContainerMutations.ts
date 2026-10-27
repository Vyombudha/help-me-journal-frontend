import { api } from "@/lib/api"
import {
  type SuccessResponse,
  type CreateContainerDTO,
  type ContainerDTO,
  type UpdateContainerContentDTO,
  type UpdateContainerTitleDTO,
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
      queryClient.invalidateQueries({ queryKey: ["containers", projectId] })
    },
  })
}

export function useUpdateContainerTitle() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      containerId,
      ...updatedContainerData
    }: UpdateContainerTitleDTO & { containerId: string }) => {
      const { data } = await api.patch<SuccessResponse<ContainerDTO>>(
        `/containers/${containerId}/title`,
        updatedContainerData
      )
      return data.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["containers", data.projectId],
      })
    },
  })
}
export function useUpdateContainerContent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      containerId,
      ...updatedContainerData
    }: UpdateContainerContentDTO & { containerId: string }) => {
      const { data } = await api.patch<SuccessResponse<ContainerDTO>>(
        `/containers/${containerId}/content`,
        updatedContainerData
      )
      return data.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["containers", data.projectId],
      })
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
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["containers", data.projectId],
      })
    },
  })
}
