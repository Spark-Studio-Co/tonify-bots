import type { ICreateAnnouncementDTO } from "../dto/create-announcement.dto"
import { apiClient } from "@/shared/api/apiClient"

export const createAnnouncement = async (announcement: ICreateAnnouncementDTO) => {
  const response = await apiClient.post("/announcements", announcement)
  return response.data
}
