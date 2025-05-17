import { ExternalLink } from "lucide-react";

export function LinkExamples() {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-2">Примеры ссылок</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-center">
            <ExternalLink size={14} className="mr-2 text-gray-400" />
            https://t.me/example_chat
          </li>
          <li className="flex items-center">
            <ExternalLink size={14} className="mr-2 text-gray-400" />
            t.me/example_group
          </li>
          <li className="flex items-center">
            <ExternalLink size={14} className="mr-2 text-gray-400" />
            @example_chat
          </li>
        </ul>
      </div>
    </div>
  );
}
