export interface Ad {
  id: number;
  title: string;
  image: string;
  status: "open" | "closed";
  date: string;
}

export const AnnouncementCard = ({ ad }: { ad?: Ad }) => {
  if (!ad) {
    return <div className="text-red-500">Ошибка: объявление не найдено</div>;
  }

  const statusColor =
    ad.status === "open" ? "var(--color-secondary, #7bc394)" : "#f87171";

  return (
    <div className="rounded-xl p-3 bg-[#EFF3FC] flex items-center gap-3">
      <img
        src={ad.image || "/placeholder.svg"}
        alt={ad.title}
        className="w-12 h-12 rounded-lg object-cover"
      />

      <div className="flex-1">
        <h4 className="font-medium text-dark text-sm">{ad.title}</h4>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-gray-500">{ad.date}</span>
          <span className="text-xs font-medium" style={{ color: statusColor }}>
            {ad.status === "open" ? "Открыто" : "Закрыто"}
          </span>
        </div>
      </div>
    </div>
  );
};
