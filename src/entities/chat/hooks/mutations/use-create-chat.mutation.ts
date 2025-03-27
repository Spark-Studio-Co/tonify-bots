import { useMutation } from "@tanstack/react-query";
import { createChat } from "../../api/post/create-chat.api";
import { toast } from "react-toastify";

export const useCreateChat = () =>
  useMutation({
    mutationFn: createChat,
    onSuccess: () => {
      toast.success("✅ Чат успешно добавлен");
    },
    onError: (error: any) => {
      console.error("❌ Ошибка при создании чата:", error);
      toast.error("❌ Не удалось отправить чат");
    },
  });
