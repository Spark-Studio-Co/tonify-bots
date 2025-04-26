import { useAnnouncements } from "@/entities/announcement/hooks/queries/use-get-announcements.query"
import { AnnouncementCard } from "@/entities/announcement/ui/announcement-card"

export default function AnnouncementsList() {
  const { data: ads = [], isLoading, isError } = useAnnouncements()

  return (
    <div className="mt-4">
      <h3 className="font-semibold mb-3" style={{ color: "var(--color-dark, #121826)" }}>
        Мои объявления
      </h3>
      <div className="space-y-3">
        {isLoading ? (
          <p className="text-center text-gray-500 py-4">Загрузка объявлений...</p>
        ) : isError ? (
          <p className="text-center text-red-500 py-4">Ошибка загрузки</p>
        ) : ads.length > 0 ? (
          ads.map((ad) => <AnnouncementCard key={ad.id} ad={ad} />)
        ) : (
          <p className="text-center text-gray-500 py-4">Нет объявлений</p>
        )}
      </div>
    </div>
  )
}
