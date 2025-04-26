import type { ICreateChatDTO } from "../dto/create-chat.dto"
import { apiClient } from "@/shared/api/apiClient"

export const createChat = async (chat: ICreateChatDTO) => {
  const response = await apiClient.post("/chats", chat)
  return response.data
}
