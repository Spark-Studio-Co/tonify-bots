import { apiClient } from "@/shared/api/apiClient";

export interface Chat {
  id: number;
  name: string;
  link: string;
  status: string;
  imageUrl: string;
  userId: number;
  participants?: Array<{
    userId: number;
    telegramUsername: string;
    name: string;
  }>;
}

export const getChats = async (): Promise<Chat[]> => {
  const response = await apiClient.get("/chats/chat/my-chats");
  return response.data;
};
