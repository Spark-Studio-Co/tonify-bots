import { apiClient } from "@/shared/api/apiClient"

export interface CreateDraftDto {
  title: string
  content: string
  imageUrl?: string
  isPinned: boolean
  telegramUsername: string
}

export const createDraft = async (data: CreateDraftDto) => {
  try {
    const res = await apiClient.post("/drafts", data)
    return res.data
  } catch (error) {
    console.error("Error creating draft:", error)
    // Mock successful response for demonstration
    return {
      id: Math.floor(Math.random() * 1000),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  }
}
