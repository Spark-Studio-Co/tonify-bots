"use client";

import { Ad, AnnouncementCard } from "@/entities/announcement/announcement-tab";

interface AdsListProps {
  ads: Ad[];
  filter: string;
  onFilterChange: (filter: string) => void;
}

export default function AnnouncementsList({
  ads,
  filter,
  onFilterChange,
}: AdsListProps) {
  const filters = [
    { value: "all", label: "Все" },
    { value: "open", label: "Открытые" },
    { value: "closed", label: "Закрытые" },
  ];

  const filteredAds =
    filter === "all" ? ads : ads.filter((ad) => ad.status === filter);

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-3">
        <h3
          className="font-semibold"
          style={{ color: "var(--color-dark, #121826)" }}
        >
          Мои объявления
        </h3>
        <div className="flex items-center gap-2 ">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => onFilterChange(f.value)}
              className={`text-xs py-1 px-3 rounded-full transition-colors ${
                filter === f.value ? "text-white" : "text-gray-500"
              }`}
              style={{
                backgroundColor:
                  filter === f.value
                    ? "var(--color-main, #627ffe)"
                    : "transparent",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3 ">
        {filteredAds.length > 0 ? (
          filteredAds.map((ad) => <AnnouncementCard key={ad.id} ad={ad} />)
        ) : (
          <p className="text-center text-gray-500 py-4">Нет объявлений</p>
        )}
      </div>
    </div>
  );
}
