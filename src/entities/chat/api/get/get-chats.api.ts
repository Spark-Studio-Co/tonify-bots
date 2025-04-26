import { apiClient } from "@/shared/api/apiClient"

export interface Chat {
  id: number
  name: string
  link: string
  status: string
  imageUrl: string
  userId: number
}

export const getChats = async (): Promise<Chat[]> => {
  const response = await apiClient.get("/chats")
  return response.data
}
