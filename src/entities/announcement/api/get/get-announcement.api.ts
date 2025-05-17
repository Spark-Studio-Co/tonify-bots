import { apiClient } from "@/shared/api/apiClient";

export const getAnnouncement = async (id: number | string): Promise<any> => {
  const response = await apiClient.get(`/announcements/${id}`);
  return response.data;
};
