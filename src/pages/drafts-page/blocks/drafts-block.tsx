"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FileText, Plus, Trash2, Pin, Edit, Eye } from "lucide-react"
import { useDrafts } from "@/entities/draft/hooks/useDrafts"
import { useDeleteDraft } from "@/entities/draft/hooks/useDeleteDraft"
import { usePinDraft } from "@/entities/draft/hooks/usePinDraft"
import { useNavigate } from "react-router-dom"
import Modal from "@/shared/layouts/modal-layout"

export default function DraftsBlock() {
  const { data: drafts, isLoading } = useDrafts()
  const { mutate: deleteDraft } = useDeleteDraft()
  const { mutate: pinDraft } = usePinDraft()
  const navigate = useNavigate()

  const [previewDraft, setPreviewDraft] = useState<any | null>(null)
  const [showPreview, setShowPreview] = useState(false)

  const handleDeleteDraft = (id: number) => {
    if (window.confirm("Are you sure you want to delete this draft?")) {
      deleteDraft(id)
    }
  }

  const handlePinDraft = (id: number, isPinned: boolean) => {
    pinDraft({ id, isPinned: !isPinned })
  }

  const handleCreateDraft = () => {
    navigate("/create-draft")
  }

  const handleEditDraft = (id: number) => {
    navigate(`/edit-draft/${id}`)
  }

  const handlePreviewDraft = (draft: any) => {
    setPreviewDraft(draft)
    setShowPreview(true)
  }

  return (
    <div className="min-h-screen w-full pb-20">
      <div className="container mx-auto max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Draft Announcements</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCreateDraft}
            className="p-2 rounded-full"
            style={{ backgroundColor: "var(--color-main, #627ffe)" }}
          >
            <Plus size={24} color="white" />
          </motion.button>
        </div>

        {/* Drafts List */}
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin h-8 w-8 border-2 border-main border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-500">Loading drafts...</p>
          </div>
        ) : drafts && drafts.length > 0 ? (
          <div className="space-y-4">
            {drafts.map((draft) => (
              <div key={draft.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-medium text-gray-900 flex items-center">
                      {draft.isPinned && <Pin size={16} className="mr-1 text-main" />}
                      {draft.title || "Untitled Draft"}
                    </h3>
                    <span className="text-xs text-gray-500">{draft.updatedAt}</span>
                  </div>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{draft.content}</p>

                  {draft.imageUrl && (
                    <div className="mb-3">
                      <img
                        src={draft.imageUrl || "/placeholder.svg"}
                        alt="Draft preview"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  <div className="flex justify-between">
                    <div className="flex space-x-2">
                      <button onClick={() => handleDeleteDraft(draft.id)} className="p-2 rounded-lg hover:bg-gray-100">
                        <Trash2 size={18} className="text-red-500" />
                      </button>
                      <button
                        onClick={() => handlePinDraft(draft.id, draft.isPinned)}
                        className="p-2 rounded-lg hover:bg-gray-100"
                      >
                        <Pin size={18} className={draft.isPinned ? "text-main" : "text-gray-400"} />
                      </button>
                    </div>
                    <div className="flex space-x-2">
                      <button onClick={() => handlePreviewDraft(draft)} className="p-2 rounded-lg hover:bg-gray-100">
                        <Eye size={18} className="text-gray-500" />
                      </button>
                      <button onClick={() => handleEditDraft(draft.id)} className="p-2 rounded-lg hover:bg-gray-100">
                        <Edit size={18} className="text-main" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <FileText size={48} className="mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No drafts yet</h3>
            <p className="text-gray-500 mb-6">Create your first draft announcement</p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCreateDraft}
              className="py-3 px-6 rounded-xl text-white font-medium"
              style={{
                backgroundColor: "var(--color-main, #627ffe)",
                boxShadow: "0 4px 14px rgba(98, 127, 254, 0.2)",
              }}
            >
              Create Draft
            </motion.button>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      <Modal isOpen={showPreview} onClose={() => setShowPreview(false)} title="Draft Preview">
        {previewDraft && (
          <div className="space-y-4">
            {previewDraft.imageUrl && (
              <img
                src={previewDraft.imageUrl || "/placeholder.svg"}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
              />
            )}
            <h3 className="font-medium text-lg text-gray-900">
              {previewDraft.isPinned && <Pin size={16} className="inline mr-1 text-main" />}
              {previewDraft.title || "Untitled Draft"}
            </h3>
            <p className="text-gray-600 whitespace-pre-wrap">{previewDraft.content}</p>

            <div className="pt-4 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowPreview(false)}
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
