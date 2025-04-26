import { apiClient } from "@/shared/api/apiClient"

export interface Publication {
  id: number
  content: string
  imageUrl?: string
  status: "pending" | "published" | "error"
  date: string
  chatId: number
  chatName: string
  error?: string
}

// This is a mock implementation since the actual API endpoint might not exist yet
export const getPublicationLog = async (): Promise<Publication[]> => {
  try {
    const res = await apiClient.get("/publications/log")
    return res.data
  } catch (error) {
    console.error("Error fetching publication log:", error)

    // Return mock data for demonstration
    return [
      {
        id: 1,
        content: "We're excited to announce our new product line coming next month! Stay tuned for more details.",
        imageUrl: "/placeholder.svg?height=200&width=400",
        status: "published",
        date: "2023-05-15 14:30",
        chatId: 1,
        chatName: "Product Announcements",
      },
      {
        id: 2,
        content: "Get 20% off on all products this weekend using code WEEKEND20.",
        status: "pending",
        date: "2023-05-16 09:15",
        chatId: 2,
        chatName: "Special Offers",
      },
      {
        id: 3,
        content: "Reminder: Our office will be closed on Monday for the holiday.",
        status: "error",
        date: "2023-05-14 16:45",
        chatId: 1,
        chatName: "Product Announcements",
        error: "Bot does not have permission to post in this chat",
      },
    ]
  }
}
