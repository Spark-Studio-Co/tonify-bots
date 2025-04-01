import { useQuery } from "@tanstack/react-query";
import { getAnnouncements } from "../../api/get/get-announcements.api";
import type { Ad } from "@/entities/search/model/use-search-store";

const mapStatus = (status: "active" | "inactive"): "open" | "closed" => {
  return status === "active" ? "open" : "closed";
};

export const useAnnouncements = () => {
  return useQuery<Ad[]>({
    queryKey: ["announcements"],
    queryFn: async () => {
      const data = await getAnnouncements(); // <- это Announcement[]
      return data.map((item: any) => ({
        id: item.id,
        title: item.name,
        image: item.imageUrl,
        status: mapStatus(item.status), // 👈 тут происходит преобразование
        date: new Date().toLocaleDateString("ru-RU"), // или item.createdAt
      }));
    },
  });
};
