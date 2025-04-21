import { apiClient } from "@/shared/api/apiClient";

export const loginUser = async (data: {
  telegramUsername: any;
  pin: string;
}): Promise<{
  message: string;
  code: number;
  accessToken: string;
  userId: number;
}> => {
  const response = await apiClient.post("/auth/login-pin", data);
  console.log(response.data);
  return response.data;
};
