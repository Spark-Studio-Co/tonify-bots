import { apiClient } from "@/shared/api/apiClient";

export const registerUser = async (data: {
  chatId: string;
  telegramUsername: string;
}): Promise<{
  message: string;
  code: number;
  accessToken: string;
  userId: number;
}> => {
  const response = await apiClient
    .post("/auth/register", data)
    .then((res) => res.data);

  return response.data;
};
