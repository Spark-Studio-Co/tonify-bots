"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Users, Search, Filter, ChevronDown, Edit, UserCheck } from "lucide-react"
import { useUsers } from "@/entities/admin/hooks/useUsers"
import { useUpdateUserRole } from "@/entities/admin/hooks/useUpdateUserRole"
import Modal from "@/shared/layouts/modal-layout"

export default function AdminBlock() {
  const { data: users, isLoading } = useUsers()
  const { mutate: updateUserRole } = useUpdateUserRole()

  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any | null>(null)
  const [showRoleModal, setShowRoleModal] = useState(false)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const filteredUsers =
    users?.filter((user) => {
      const matchesSearch =
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.telegramUsername.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesRole = roleFilter === "all" || user.role === roleFilter

      return matchesSearch && matchesRole
    }) || []

  const handleEditRole = (user: any) => {
    setSelectedUser(user)
    setShowRoleModal(true)
  }

  const handleUpdateRole = (newRole: string) => {
    if (!selectedUser) return

    updateUserRole(
      {
        userId: selectedUser.id,
        role: newRole,
      },
      {
        onSuccess: () => {
          setShowRoleModal(false)
        },
      },
    )
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-red-100 text-red-800"
      case "AGENCY":
        return "bg-purple-100 text-purple-800"
      case "INVESTOR":
        return "bg-blue-100 text-blue-800"
      case "USER":
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen w-full pb-20">
      <div className="container mx-auto max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 rounded-lg flex items-center"
            style={{
              backgroundColor: showFilters ? "var(--color-main-light, #eff3fc)" : "transparent",
              color: "var(--color-main, #627ffe)",
            }}
          >
            <Filter size={18} className="mr-1" />
            <span className="text-sm">Filter</span>
            <ChevronDown size={16} className={`ml-1 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </motion.button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
          <div className="p-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search users..."
                className="w-full py-2.5 pl-10 pr-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500"
              />
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2"
                style={{ color: "var(--color-main, #627ffe)" }}
              />
            </div>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden"
          >
            <div className="p-4">
              <h3 className="font-medium text-gray-900 mb-3">Filter by Role</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setRoleFilter("all")}
                  className={`py-1.5 px-3 rounded-lg text-sm ${
                    roleFilter === "all" ? "text-white bg-main" : "text-gray-700 bg-gray-100"
                  }`}
                >
                  All Roles
                </button>
                <button
                  onClick={() => setRoleFilter("ADMIN")}
                  className={`py-1.5 px-3 rounded-lg text-sm ${
                    roleFilter === "ADMIN" ? "text-white bg-red-500" : "text-gray-700 bg-gray-100"
                  }`}
                >
                  Admin
                </button>
                <button
                  onClick={() => setRoleFilter("AGENCY")}
                  className={`py-1.5 px-3 rounded-lg text-sm ${
                    roleFilter === "AGENCY" ? "text-white bg-purple-500" : "text-gray-700 bg-gray-100"
                  }`}
                >
                  Agency
                </button>
                <button
                  onClick={() => setRoleFilter("INVESTOR")}
                  className={`py-1.5 px-3 rounded-lg text-sm ${
                    roleFilter === "INVESTOR" ? "text-white bg-blue-500" : "text-gray-700 bg-gray-100"
                  }`}
                >
                  Investor
                </button>
                <button
                  onClick={() => setRoleFilter("USER")}
                  className={`py-1.5 px-3 rounded-lg text-sm ${
                    roleFilter === "USER" ? "text-white bg-gray-500" : "text-gray-700 bg-gray-100"
                  }`}
                >
                  User
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Users List */}
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin h-8 w-8 border-2 border-main border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-500">Loading users...</p>
          </div>
        ) : filteredUsers.length > 0 ? (
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{user.username}</h3>
                      <p className="text-sm text-gray-500">@{user.telegramUsername}</p>
                    </div>
                    <div className="flex items-center">
                      <span className={`text-xs px-2 py-1 rounded-full ${getRoleBadgeColor(user.role)}`}>
                        {user.role}
                      </span>
                      <button onClick={() => handleEditRole(user)} className="ml-2 p-2 rounded-full hover:bg-gray-100">
                        <Edit size={16} className="text-gray-500" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-sm">
                    <div>
                      <span className="text-gray-500">Balance:</span>
                      <span className="ml-1 font-medium text-gray-900">{user.balance} TON</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Joined:</span>
                      <span className="ml-1 font-medium text-gray-900">{user.joinedDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <Users size={48} className="mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-500">
              {searchQuery ? "No users match your search criteria" : "User list is empty"}
            </p>
          </div>
        )}
      </div>

      {/* Role Update Modal */}
      <Modal isOpen={showRoleModal} onClose={() => setShowRoleModal(false)} title="Update User Role">
        {selectedUser && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">User</h3>
              <p className="text-gray-900">
                {selectedUser.username} (@{selectedUser.telegramUsername})
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Select Role</h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleUpdateRole("ADMIN")}
                  className={`w-full py-2 px-4 rounded-lg flex items-center justify-between ${
                    selectedUser.role === "ADMIN"
                      ? "bg-red-100 text-red-800 border border-red-300"
                      : "bg-white border border-gray-200"
                  }`}
                >
                  <span className="font-medium">Admin</span>
                  {selectedUser.role === "ADMIN" && <UserCheck size={18} />}
                </button>

                <button
                  onClick={() => handleUpdateRole("AGENCY")}
                  className={`w-full py-2 px-4 rounded-lg flex items-center justify-between ${
                    selectedUser.role === "AGENCY"
                      ? "bg-purple-100 text-purple-800 border border-purple-300"
                      : "bg-white border border-gray-200"
                  }`}
                >
                  <span className="font-medium">Agency</span>
                  {selectedUser.role === "AGENCY" && <UserCheck size={18} />}
                </button>

                <button
                  onClick={() => handleUpdateRole("INVESTOR")}
                  className={`w-full py-2 px-4 rounded-lg flex items-center justify-between ${
                    selectedUser.role === "INVESTOR"
                      ? "bg-blue-100 text-blue-800 border border-blue-300"
                      : "bg-white border border-gray-200"
                  }`}
                >
                  <span className="font-medium">Investor</span>
                  {selectedUser.role === "INVESTOR" && <UserCheck size={18} />}
                </button>

                <button
                  onClick={() => handleUpdateRole("USER")}
                  className={`w-full py-2 px-4 rounded-lg flex items-center justify-between ${
                    selectedUser.role === "USER"
                      ? "bg-gray-100 text-gray-800 border border-gray-300"
                      : "bg-white border border-gray-200"
                  }`}
                >
                  <span className="font-medium">User</span>
                  {selectedUser.role === "USER" && <UserCheck size={18} />}
                </button>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowRoleModal(false)}
                className="py-2 px-4 rounded-lg text-gray-700 font-medium mr-2 bg-gray-100"
              >
                Cancel
              </motion.button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
