"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Clock, AlertCircle, Calendar, Filter, ChevronDown, Eye } from "lucide-react"
import { usePublicationLog } from "@/entities/publication/hooks/usePublicationLog"
import Modal from "@/shared/layouts/modal-layout"

export default function PublicationLogBlock() {
  const { data: publications, isLoading } = usePublicationLog()

  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedPublication, setSelectedPublication] = useState<any | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "published":
        return <CheckCircle size={20} className="text-green-500" />
      case "pending":
        return <Clock size={20} className="text-yellow-500" />
      case "error":
        return <AlertCircle size={20} className="text-red-500" />
      default:
        return <Clock size={20} className="text-gray-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "published":
        return "Published"
      case "pending":
        return "Pending"
      case "error":
        return "Error"
      default:
        return "Unknown"
    }
  }

  const filteredPublications =
    publications?.filter((pub) => statusFilter === "all" || pub.status === statusFilter) || []

  const handleViewDetails = (publication: any) => {
    setSelectedPublication(publication)
    setShowDetails(true)
  }

  return (
    <div className="min-h-screen w-full pb-20">
      <div className="container mx-auto max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Publication Log</h1>
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

        {/* Filters */}
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden"
          >
            <div className="p-4">
              <h3 className="font-medium text-gray-900 mb-3">Filter by Status</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setStatusFilter("all")}
                  className={`py-1.5 px-3 rounded-lg text-sm ${
                    statusFilter === "all" ? "text-white bg-main" : "text-gray-700 bg-gray-100"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setStatusFilter("published")}
                  className={`py-1.5 px-3 rounded-lg text-sm ${
                    statusFilter === "published" ? "text-white bg-green-500" : "text-gray-700 bg-gray-100"
                  }`}
                >
                  Published
                </button>
                <button
                  onClick={() => setStatusFilter("pending")}
                  className={`py-1.5 px-3 rounded-lg text-sm ${
                    statusFilter === "pending" ? "text-white bg-yellow-500" : "text-gray-700 bg-gray-100"
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setStatusFilter("error")}
                  className={`py-1.5 px-3 rounded-lg text-sm ${
                    statusFilter === "error" ? "text-white bg-red-500" : "text-gray-700 bg-gray-100"
                  }`}
                >
                  Error
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Publications List */}
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin h-8 w-8 border-2 border-main border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-500">Loading publication log...</p>
          </div>
        ) : filteredPublications.length > 0 ? (
          <div className="space-y-4">
            {filteredPublications.map((publication) => (
              <div key={publication.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      {getStatusIcon(publication.status)}
                      <span className="ml-2 font-medium text-gray-900">{getStatusText(publication.status)}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar size={14} className="mr-1" />
                      {publication.date}
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{publication.content}</p>

                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500">{publication.chatName || "Unknown chat"}</div>
                    <button
                      onClick={() => handleViewDetails(publication)}
                      className="flex items-center text-sm text-main"
                    >
                      <Eye size={16} className="mr-1" />
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <Calendar size={48} className="mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No publications found</h3>
            <p className="text-gray-500">
              {statusFilter !== "all"
                ? `No ${statusFilter} publications found`
                : "Your publication history will appear here"}
            </p>
          </div>
        )}
      </div>

      {/* Publication Details Modal */}
      <Modal isOpen={showDetails} onClose={() => setShowDetails(false)} title="Publication Details">
        {selectedPublication && (
          <div className="space-y-4">
            <div className="flex items-center">
              {getStatusIcon(selectedPublication.status)}
              <span className="ml-2 font-medium text-gray-900">{getStatusText(selectedPublication.status)}</span>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Date</h3>
              <p className="text-gray-900">{selectedPublication.date}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Chat</h3>
              <p className="text-gray-900">{selectedPublication.chatName || "Unknown chat"}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Content</h3>
              <p className="text-gray-900 whitespace-pre-wrap">{selectedPublication.content}</p>
            </div>

            {selectedPublication.imageUrl && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Image</h3>
                <img
                  src={selectedPublication.imageUrl || "/placeholder.svg"}
                  alt="Publication"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}

            {selectedPublication.error && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Error Details</h3>
                <p className="text-red-500">{selectedPublication.error}</p>
              </div>
            )}

            <div className="pt-4 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowDetails(false)}
                className="py-2 px-4 rounded-lg text-white font-medium"
                style={{ backgroundColor: "var(--color-main, #627ffe)" }}
              >
                Close
              </motion.button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
