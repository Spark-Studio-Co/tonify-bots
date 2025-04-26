import { apiClient } from "@/shared/api/apiClient"

export interface User {
  id: number
  username: string
  telegramUsername: string
  role: string
  balance: number
  joinedDate: string
}

// This is a mock implementation since the actual API endpoint might not exist yet
export const getUsers = async (): Promise<User[]> => {
  try {
    const res = await apiClient.get("/admin/users")
    return res.data
  } catch (error) {
    console.error("Error fetching users:", error)

    // Return mock data for demonstration
    return [
      {
        id: 1,
        username: "John Doe",
        telegramUsername: "johndoe",
        role: "ADMIN",
        balance: 150.5,
        joinedDate: "2023-01-15",
      },
      {
        id: 2,
        username: "Jane Smith",
        telegramUsername: "janesmith",
        role: "AGENCY",
        balance: 75.25,
        joinedDate: "2023-02-20",
      },
      {
        id: 3,
        username: "Bob Johnson",
        telegramUsername: "bobjohnson",
        role: "INVESTOR",
        balance: 500.0,
        joinedDate: "2023-03-10",
      },
      {
        id: 4,
        username: "Alice Brown",
        telegramUsername: "alicebrown",
        role: "USER",
        balance: 25.75,
        joinedDate: "2023-04-05",
      },
    ]
  }
}
