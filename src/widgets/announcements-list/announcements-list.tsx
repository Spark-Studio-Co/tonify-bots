import { useAnnouncements } from "@/entities/announcement/hooks/queries/use-get-announcements.query";
import { AnnouncementCard } from "@/entities/announcement/ui/announcement-card";

export default function AnnouncementsList() {
  const { data: ads = [], isLoading, isError } = useAnnouncements();

  return (
    <div className="mt-4">
      <h3
        className="font-semibold mb-3"
        style={{ color: "var(--color-dark, #121826)" }}
      >
        Мои объявления
      </h3>
      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {isLoading ? (
          <>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="rounded-xl p-3 bg-[#EFF3FC] flex items-center gap-3 animate-pulse"
              >
                <div className="w-12 h-12 rounded-lg bg-gray-300" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-3/4" />
                  <div className="flex items-center justify-between mt-1">
                    <div className="h-3 bg-gray-200 rounded w-1/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/6" />
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : isError ? (
          <p className="text-center text-red-500 py-4">Ошибка загрузки</p>
        ) : ads.length > 0 ? (
          ads.map((ad: any) => (
            <AnnouncementCard
              key={ad.id}
              ad={{
                id: ad.id,
                title: ad.name,
                image: ad.imageUrl,
                status: ad.status === "active" ? "open" : "closed",
                date: new Date().toLocaleDateString(), // или передай свою дату, если есть
              }}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 py-4">Нет объявлений</p>
        )}
      </div>
    </div>
  );
}
