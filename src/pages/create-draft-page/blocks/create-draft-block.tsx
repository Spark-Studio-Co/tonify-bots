"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { ImageIcon, X, ArrowLeft } from "lucide-react"
import { useCreateDraft } from "@/entities/draft/hooks/useCreateDraft"
import { useNavigate } from "react-router-dom"
import WebApp from "@twa-dev/sdk"

export default function CreateDraftBlock() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isPinned, setIsPinned] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { mutate: createDraft, isPending } = useCreateDraft()
  const navigate = useNavigate()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()

      reader.onload = (event) => {
        if (event.target?.result) {
          setPreviewImage(event.target.result as string)
        }
      }

      reader.readAsDataURL(file)
    }
  }

  const handleSaveDraft = () => {
    if (!content.trim()) {
      WebApp.showAlert("Please enter some content for your draft")
      return
    }

    createDraft(
      {
        title,
        content,
        isPinned,
        imageUrl: previewImage || "",
        telegramUsername: WebApp.initDataUnsafe?.user?.username || "",
      },
      {
        onSuccess: () => {
          WebApp.showAlert("Draft saved successfully!")
          navigate("/drafts")
        },
      },
    )
  }

  return (
    <div className="min-h-screen w-full pb-20">
      <div className="container mx-auto max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => navigate("/drafts")} className="p-2 rounded-full hover:bg-gray-100">
            <ArrowLeft size={24} className="text-gray-900" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Create Draft</h1>
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-4 space-y-4">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1 text-gray-700">
                Title (Optional)
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
                className="w-full py-3 px-4 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500"
              />
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-1 text-gray-700">
                Content*
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter your announcement content"
                rows={6}
                className="w-full py-3 px-4 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Image (Optional)</label>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />

              {previewImage ? (
                <div className="relative">
                  <img
                    src={previewImage || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setPreviewImage(null)}
                    className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1"
                  >
                    <X size={16} className="text-white" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-4 h-32 flex flex-col items-center justify-center cursor-pointer"
                >
                  <ImageIcon size={24} className="text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Click to add an image</p>
                </div>
              )}
            </div>

            {/* Pin Option */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isPinned"
                checked={isPinned}
                onChange={(e) => setIsPinned(e.target.checked)}
                className="h-4 w-4 text-main focus:ring-main border-gray-300 rounded"
              />
              <label htmlFor="isPinned" className="ml-2 block text-sm text-gray-900">
                Pin this announcement when published
              </label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSaveDraft}
          disabled={isPending || !content.trim()}
          className="w-full py-3.5 px-6 rounded-xl text-white font-medium disabled:opacity-50"
          style={{
            backgroundColor: "var(--color-main, #627ffe)",
            boxShadow: "0 4px 14px rgba(98, 127, 254, 0.2)",
          }}
        >
          {isPending ? "Saving..." : "Save Draft"}
        </motion.button>
      </div>
    </div>
  )
}
