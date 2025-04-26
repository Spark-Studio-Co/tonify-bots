"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock, Send, CheckCircle } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import { useGetDraft } from "@/entities/draft/hooks/useGetDraft"
import { usePublishAnnouncement } from "@/entities/publication/hooks/usePublishAnnouncement"
import { useChats } from "@/entities/chat/hooks/queries/use-get-chats.queries"
import LoadingIndicator from "@/shared/ui/loading-indicator/loading-indicator"
import WebApp from "@twa-dev/sdk"

export default function PublishAnnouncementBlock() {
  const { id } = useParams<{ id: string }>()
  const draftId = id ? Number.parseInt(id) : 0

  const { data: draft, isLoading: isLoadingDraft } = useGetDraft(draftId)
  const { data: chats = [], isLoading: isLoadingChats } = useChats()
  const { mutate: publishAnnouncement, isPending } = usePublishAnnouncement()

  const navigate = useNavigate()

  const [selectedChats, setSelectedChats] = useState<number[]>([])
  const [scheduleDate, setScheduleDate] = useState("")
  const [scheduleTime, setScheduleTime] = useState("")
  const [isScheduled, setIsScheduled] = useState(false)

  // Set minimum date to today
  const today = new Date().toISOString().split("T")[0]

  const handleChatToggle = (chatId: number) => {
    setSelectedChats((prev) => {
      if (prev.includes(chatId)) {
        return prev.filter((id) => id !== chatId)
      } else {
        return [...prev, chatId]
      }
    })
  }

  const handlePublish = () => {
    if (selectedChats.length === 0) {
      WebApp.showAlert("Please select at least one chat")
      return
    }

    const payload = {
      draftId,
      chatIds: selectedChats,
      isPinned: draft?.isPinned || false,
      ...(isScheduled && scheduleDate && scheduleTime
        ? { scheduledAt: new Date(`${scheduleDate}T${scheduleTime}`).toISOString() }
        : {}),
    }

    publishAnnouncement(payload, {
      onSuccess: () => {
        WebApp.showAlert("Announcement published successfully!")
        navigate("/publication-log")
      },
      onError: (error) => {
        console.error("Error publishing announcement:", error)
        WebApp.showAlert("Failed to publish announcement. Please try again.")
      },
    })
  }

  if (isLoadingDraft || isLoadingChats) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <LoadingIndicator size="large" />
      </div>
    )
  }

  if (!draft && !isLoadingDraft) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Draft Not Found</h2>
        <p className="text-gray-600 mb-6 text-center">
          The draft you're looking for doesn't exist or has been deleted.
        </p>
        <button
          onClick={() => navigate("/drafts")}
          className="py-2 px-4 rounded-lg text-white font-medium"
          style={{ backgroundColor: "var(--color-main, #627ffe)" }}
        >
          Back to Drafts
        </button>
      </div>
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
          <h1 className="text-xl font-bold text-gray-900">Publish Announcement</h1>
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>

        {/* Draft Preview */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-4">
            <h2 className="font-medium text-gray-900 mb-2">Draft Preview</h2>

            {draft?.title && <h3 className="font-medium text-gray-900 mb-1">{draft.title}</h3>}

            <p className="text-gray-600 mb-3">{draft?.content}</p>

            {draft?.imageUrl && (
              <img
                src={draft.imageUrl || "/placeholder.svg"}
                alt="Draft preview"
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
            )}

            {draft?.isPinned && (
              <div className="flex items-center text-sm text-main">
                <CheckCircle size={16} className="mr-1" />
                This announcement will be pinned
              </div>
            )}
          </div>
        </div>

        {/* Select Chats */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-4">
            <h2 className="font-medium text-gray-900 mb-3">Select Chats*</h2>

            {chats.length > 0 ? (
              <div className="space-y-2">
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => handleChatToggle(chat.id)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedChats.includes(chat.id)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900">{chat.name}</span>
                      {selectedChats.includes(chat.id) && (
                        <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                          <CheckCircle size={14} className="text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">No chats available. Please add a chat first.</div>
            )}
          </div>
        </div>

        {/* Schedule */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-medium text-gray-900">Schedule (Optional)</h2>
              <div className="relative inline-block w-12 h-6 rounded-full cursor-pointer">
                <input
                  type="checkbox"
                  id="schedule-toggle"
                  className="sr-only"
                  checked={isScheduled}
                  onChange={() => setIsScheduled(!isScheduled)}
                />
                <span
                  className={`block w-full h-full rounded-full ${
                    isScheduled ? "bg-main" : "bg-gray-300"
                  } transition-colors duration-200`}
                ></span>
                <span
                  className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 transform ${
                    isScheduled ? "translate-x-6" : "translate-x-0"
                  }`}
                ></span>
              </div>
            </div>

            {isScheduled && (
              <div className="space-y-3">
                <div>
                  <label htmlFor="schedule-date" className="block text-sm font-medium mb-1 text-gray-700">
                    Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="schedule-date"
                      min={today}
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      className="w-full py-3 pl-10 pr-4 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500"
                    />
                    <Calendar size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                </div>

                <div>
                  <label htmlFor="schedule-time" className="block text-sm font-medium mb-1 text-gray-700">
                    Time
                  </label>
                  <div className="relative">
                    <input
                      type="time"
                      id="schedule-time"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      className="w-full py-3 pl-10 pr-4 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500"
                    />
                    <Clock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Publish Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handlePublish}
          disabled={isPending || selectedChats.length === 0 || (isScheduled && (!scheduleDate || !scheduleTime))}
          className="w-full py-3.5 px-6 rounded-xl text-white font-medium flex items-center justify-center disabled:opacity-50"
          style={{
            backgroundColor: "var(--color-main, #627ffe)",
            boxShadow: "0 4px 14px rgba(98, 127, 254, 0.2)",
          }}
        >
          {isPending ? (
            <>
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2" />
              Publishing...
            </>
          ) : (
            <>
              <Send size={18} className="mr-2" />
              {isScheduled ? "Schedule Publication" : "Publish Now"}
            </>
          )}
        </motion.button>
      </div>
    </div>
  )
}
