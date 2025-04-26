import { apiClient } from "@/shared/api/apiClient"

export const getMe = async (): Promise<{
  userId: number
  telegramUsername: string
  role: string
  balance: number
}> => {
  const response = await apiClient.get("/users/me")
  return response.data
}
