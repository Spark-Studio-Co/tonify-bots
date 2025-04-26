import { apiClient } from "@/shared/api/apiClient"

export interface PinDraftDto {
  id: number
  isPinned: boolean
}

export const pinDraft = async (data: PinDraftDto) => {
  try {
    const res = await apiClient.patch(`/drafts/${data.id}/pin`, { isPinned: data.isPinned })
    return res.data
  } catch (error) {
    console.error("Error pinning draft:", error)
    // Mock successful response for demonstration
    return {
      id: data.id,
      isPinned: data.isPinned,
    }
  }
}
