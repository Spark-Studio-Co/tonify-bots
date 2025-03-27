// src/shared/api/announcements.api.ts

import { Announcement } from "@/entities/search/model/use-search-store";
import { apiClient } from "@/shared/api/apiClient";

export const getAnnouncements = async (): Promise<Announcement[]> => {
  const response = await apiClient.get("/announcements");
  return response.data;
};
