import { useAuth } from "@clerk/react"
import { useEffect } from "react"
import { api } from "./api"

export function useApiAuth() {
  const { getToken } = useAuth()

  useEffect(() => {
    const interceptorId = api.interceptors.request.use(async (config) => {
      const token = await getToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })

    // cleanup on unmount to avoid stacking interceptors on hot reload
    return () => {
      api.interceptors.request.eject(interceptorId)
    }
  }, [getToken])
}
