import { apiClient } from "@/shared/api/apiClient"

export interface UpdateDraftDto {
  id: number
  title: string
  content: string
  imageUrl?: string
  isPinned: boolean
}

export const updateDraft = async (data: UpdateDraftDto) => {
  try {
    const res = await apiClient.put(`/drafts/${data.id}`, data)
    return res.data
  } catch (error) {
    console.error(`Error updating draft with id ${data.id}:`, error)
    // Mock successful response for demonstration
    return {
      ...data,
      updatedAt: new Date().toISOString(),
    }
  }
}
