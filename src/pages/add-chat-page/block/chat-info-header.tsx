export function ChatInfoBox() {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-4">
        <p className="text-gray-600 text-sm">
          Добавьте существующий чат, введя ссылку на него. Убедитесь, что бот{" "}
          <code>@AdsTonify_bot</code> добавлен в чат и имеет права
          администратора.
        </p>
      </div>
    </div>
  );
}
