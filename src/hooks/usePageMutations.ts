import { api } from "@/lib/api"
import {
  type CreatePageDTO,
  type PageDTO,
  type SuccessResponse,
  type UpdatePageContentDTO,
  type UpdatePageTitleDTO,
} from "@/types/dtos"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useCreatePage(workspaceId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (newPage: CreatePageDTO) => {
      const { data } = await api.post<SuccessResponse<PageDTO>>(
        `/workspaces/${workspaceId}/pages`,
        newPage
      )
      return data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pages", workspaceId] })
    },
  })
}

export function useUpdatePageTitle() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      pageId,
      ...updatedPageData
    }: UpdatePageTitleDTO & { pageId: string }) => {
      const { data } = await api.patch<SuccessResponse<PageDTO>>(
        `/pages/${pageId}/title`,
        updatedPageData
      )
      return data.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["pages", data.workspaceId],
      })
    },
  })
}

export function useUpdatePageContent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      pageId,
      ...updatedPageData
    }: UpdatePageContentDTO & { pageId: string }) => {
      const { data } = await api.patch<SuccessResponse<PageDTO>>(
        `/pages/${pageId}/content`,
        updatedPageData
      )
      return data.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["pages", data.workspaceId],
      })
    },
  })
}

export function useDeletePage() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (pageId: string) => {
      const { data } = await api.delete<SuccessResponse<PageDTO>>(
        `/pages/${pageId}`
      )
      return data.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["pages", data.workspaceId],
      })
    },
  })
}
