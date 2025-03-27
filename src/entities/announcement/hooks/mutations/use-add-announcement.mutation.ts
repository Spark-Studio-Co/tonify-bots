import { useMutation } from "@tanstack/react-query";
import { createAnnouncement } from "../../api/post/create-announcement.api";
import { toast } from "react-toastify";

export const useAddAnnouncement = useMutation({
  mutationFn: createAnnouncement,
  onSuccess: () => {
    toast.success("✅ Объявление успешно добавлено");
  },
  onError: (error: any) => {
    console.error("❌ Ошибка при создании объявления:", error);
    toast.success("❌ Ошибка при создании объявления");
  },
});
