import { useMutation } from "@tanstack/react-query"
import { createAnnouncement } from "../../api/post/create-announcement.api"
import { toast } from "react-toastify"

// ✅ Исправление
export const useAddAnnouncement = () =>
  useMutation({
    mutationFn: createAnnouncement,
    mutationKey: ["announcements"],
    onSuccess: () => {
      toast.success("✅ Объявление успешно добавлено")
    },
    onError: (error: any) => {
      console.error("❌ Ошибка при создании объявления:", error)
      toast.error("❌ Ошибка при создании объявления")
    },
  })
