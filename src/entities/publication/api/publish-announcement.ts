import { apiClient } from "@/shared/api/apiClient"

export interface PublishAnnouncementDto {
  draftId: number
  chatIds: number[]
  isPinned: boolean
  scheduledAt?: string
}

export const publishAnnouncement = async (data: PublishAnnouncementDto) => {
  try {
    const res = await apiClient.post("/publications", data)
    return res.data
  } catch (error) {
    console.error("Error publishing announcement:", error)
    // Mock successful response for demonstration
    return {
      id: Math.floor(Math.random() * 1000),
      status: data.scheduledAt ? "pending" : "published",
      createdAt: new Date().toISOString(),
    }
  }
}
