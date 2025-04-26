import { apiClient } from "@/shared/api/apiClient"

export const verifyCode = async (data: { chatId: string; code: string }) => {
  const response = await apiClient.post("/auth/verify", data)
  return response.data
}
