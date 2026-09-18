import { api } from "@/lib/api"
import {
  type SuccessResponse,
  type CreateProjectDTO,
  type ProjectDTO,
  type UpdateProjectDTO,
} from "@/types/dtos"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useCreateProject() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (newProject: CreateProjectDTO) => {
      const { data } = await api.post<SuccessResponse<ProjectDTO>>(
        "/projects",
        newProject
      )
      return data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
    },
  })
}

export function useUpdateProject() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      id,
      ...updatedProject
    }: UpdateProjectDTO & { id: string }) => {
      const { data } = await api.patch<SuccessResponse<UpdateProjectDTO>>(
        `/projects/${id}`,
        updatedProject
      )
      return data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
    },
  })
}

export function useDeleteProject() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.delete<SuccessResponse<ProjectDTO>>(
        `/projects/${id}`
      )
      return data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
    },
  })
}
