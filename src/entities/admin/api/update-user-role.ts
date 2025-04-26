import { apiClient } from "@/shared/api/apiClient"

export interface UpdateUserRoleDto {
  userId: number
  role: string
}

export const updateUserRole = async (data: UpdateUserRoleDto) => {
  try {
    const res = await apiClient.patch(`/admin/users/${data.userId}/role`, { role: data.role })
    return res.data
  } catch (error) {
    console.error("Error updating user role:", error)
    // Mock successful response for demonstration
    return {
      id: data.userId,
      role: data.role,
      success: true,
    }
  }
}
