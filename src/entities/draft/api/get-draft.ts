import { apiClient } from "@/shared/api/apiClient"
import type { Draft } from "./get-drafts"

export const getDraft = async (id: number): Promise<Draft> => {
  try {
    const res = await apiClient.get(`/drafts/${id}`)
    return res.data
  } catch (error) {
    console.error(`Error fetching draft with id ${id}:`, error)

    // Return mock data for demonstration
    return {
      id,
      title: "Sample Draft",
      content: "This is a sample draft content for demonstration purposes.",
      imageUrl: "/placeholder.svg?height=200&width=400",
      isPinned: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  }
}
