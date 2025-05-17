import { useQuery } from "@tanstack/react-query";
import { getAnnouncement } from "../../api/get/get-announcement.api";

// Helper function to map status values
const mapStatus = (status: string) => {
  switch (status) {
    case "approved":
      return "Одобрено";
    case "rejected":
      return "Отклонено";
    case "pending":
      return "На модерации";
    default:
      return "Неизвестно";
  }
};

export const useGetAnnouncement = (id: number | string) => {
  return useQuery<any>({
    queryKey: ["announcement", id],
    queryFn: async () => {
      const data = await getAnnouncement(id);
      // Assuming the API returns an array with one item or the item directly
      const item = Array.isArray(data) ? data[0] : data;

      if (!item) {
        throw new Error("Объявление не найдено");
      }

      return {
        id: item.id,
        title: item.title,
        description: item.description,
        image: item.imageUrl,
        status: mapStatus(item.status),
        date: new Date(item.createdAt || Date.now()).toLocaleDateString(
          "ru-RU"
        ),
        categories: item.categories || [],
        telegramUsername: item.telegramUsername || "",
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
