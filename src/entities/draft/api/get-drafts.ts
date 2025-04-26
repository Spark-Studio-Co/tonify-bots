import { apiClient } from "@/shared/api/apiClient"

export interface Draft {
  id: number
  title: string
  content: string
  imageUrl?: string
  isPinned: boolean
  createdAt: string
  updatedAt: string
}

// This is a mock implementation since the actual API endpoint might not exist yet
export const getDrafts = async (): Promise<Draft[]> => {
  try {
    const res = await apiClient.get("/drafts")
    return res.data
  } catch (error) {
    console.error("Error fetching drafts:", error)

    // Return mock data for demonstration
    return [
      {
        id: 1,
        title: "New Product Launch",
        content: "We're excited to announce our new product line coming next month! Stay tuned for more details.",
        imageUrl: "/placeholder.svg?height=200&width=400",
        isPinned: true,
        createdAt: "2023-05-10T12:00:00Z",
        updatedAt: "2023-05-10T14:30:00Z",
      },
      {
        id: 2,
        title: "Special Discount",
        content: "Get 20% off on all products this weekend using code WEEKEND20.",
        isPinned: false,
        createdAt: "2023-05-12T09:15:00Z",
        updatedAt: "2023-05-12T09:15:00Z",
      },
      {
        id: 3,
        title: "",
        content: "Reminder: Our office will be closed on Monday for the holiday.",
        isPinned: false,
        createdAt: "2023-05-14T16:45:00Z",
        updatedAt: "2023-05-14T16:45:00Z",
      },
    ]
  }
}
