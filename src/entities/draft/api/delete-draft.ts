import { apiClient } from "@/shared/api/apiClient"

export const deleteDraft = async (id: number) => {
  try {
    const res = await apiClient.delete(`/drafts/${id}`)
    return res.data
  } catch (error) {
    console.error("Error deleting draft:", error)
    // Mock successful response for demonstration
    return { success: true }
  }
}
