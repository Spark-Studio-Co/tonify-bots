
import { AnnouncementCard } from "@/entities/announcement/ui/announcement-card"
import type { Announcement } from "@/entities/search/model/use-search-store"
import LoadingIndicator from "@/shared/ui/loading-indicator/loading-indicator"

interface SearchResultsProps {
  results: Announcement[]
  isLoading: boolean
  onAnnouncementClick?: (announcement: Announcement) => void
  onReset?: () => void
  className?: string
}

export default function SearchResults({
  results,
  isLoading,
  // onAnnouncementClick,
  onReset,
  className = "",
}: SearchResultsProps) {
  if (isLoading) {
    return <LoadingIndicator className={className} />
  }

  if (results.length === 0) {
    return <div onReset={onReset} className={className} />
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="text-sm text-gray-500">Найдено объявлений: {results.length}</div>

      {results.map((announcement) => (
        <AnnouncementCard
          key={announcement.id}
          // ad={announcement}
          // onClick={onAnnouncementClick}
        />
      ))}
    </div>
  )
}
