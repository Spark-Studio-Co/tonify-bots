"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, ArrowUpDown } from "lucide-react";
import { DealItem } from "./deal-item";
import { Deal } from "@/shared/types/types";

interface DealsTableProps {
  deals: Deal[];
  onDealSelect: (dealId: number) => void;
}

type SortField = "createdAt" | "price" | "adId" | "chatId";
type SortDirection = "asc" | "desc";

export function DealsTable({ deals, onDealSelect }: DealsTableProps) {
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown size={16} className="ml-1 text-gray-400" />;
    }
    return sortDirection === "asc" ? (
      <ChevronUp size={16} className="ml-1 text-main" />
    ) : (
      <ChevronDown size={16} className="ml-1 text-main" />
    );
  };

  // Сортировка сделок
  const sortedDeals = [...deals].sort((a, b) => {
    if (sortField === "createdAt") {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    } else if (sortField === "price") {
      return sortDirection === "asc" ? a.price - b.price : b.price - a.price;
    } else if (sortField === "adId") {
      return sortDirection === "asc" ? a.adId - b.adId : b.adId - a.adId;
    } else if (sortField === "chatId") {
      return sortDirection === "asc"
        ? a.chatId.localeCompare(b.chatId)
        : b.chatId.localeCompare(a.chatId);
    }
    return 0;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("createdAt")}
              >
                <div className="flex items-center">
                  Дата
                  {getSortIcon("createdAt")}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("adId")}
              >
                <div className="flex items-center">
                  Объявление
                  {getSortIcon("adId")}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("chatId")}
              >
                <div className="flex items-center">
                  Чат
                  {getSortIcon("chatId")}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("price")}
              >
                <div className="flex items-center">
                  Сумма
                  {getSortIcon("price")}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Статус
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Действия
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedDeals.map((deal) => (
              <DealItem key={deal.id} deal={deal} onSelect={onDealSelect} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
