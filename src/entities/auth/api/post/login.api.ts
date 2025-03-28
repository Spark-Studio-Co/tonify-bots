import { apiClient } from "@/shared/api/apiClient";

export const loginUser = async (data: {
  chatId: string;
  password: string;
}): Promise<{
  message: string;
  code: number;
  accessToken: string;
  userId: number;
}> => {
  const response = await apiClient.post("/auth/login", data);

  return response.data;
};
