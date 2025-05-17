"use client";
import { useState, useEffect } from "react";
import { DealsHeader } from "./blocks/deals-header";
import { DealsFilters } from "./blocks/deal-filters";
import LoadingIndicator from "@/shared/ui/loading-indicator/loading-indicator";
import { DealsTable } from "./blocks/deals-table";
import { useGetDeals } from "@/entities/deals/hooks/use-get-deals";
import { useToast } from "@/shared/layouts/toast-provider";
import { DealDetails } from "./blocks/deal-details";

export type FilterOptions = {
  status: "all" | "completed" | "pending";
  dateRange: {
    from: Date | null;
    to: Date | null;
  };
  search: string;
};

export default function DealsPage() {
  const [selectedDealId, setSelectedDealId] = useState<number | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    status: "all",
    dateRange: {
      from: null,
      to: null,
    },
    search: "",
  });
  const {
    data: deals,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetDeals(filters);
  const { addToast } = useToast();

  useEffect(() => {
    if (isError && error) {
      addToast({
        title: "Ошибка загрузки",
        description:
          "Не удалось загрузить список сделок. Пожалуйста, попробуйте позже.",
        type: "error",
      });
    }
  }, [isError, error, addToast]);

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleDealSelect = (dealId: number) => {
    setSelectedDealId(dealId);
  };

  const handleDealClose = () => {
    setSelectedDealId(null);
  };

  const handleRefresh = () => {
    refetch();
  };

  return (
    <div className="min-h-screen w-full pb-20">
      <div className="container mx-auto max-w-6xl px-4">
        <DealsHeader onRefresh={handleRefresh} />
        <DealsFilters filters={filters} onFilterChange={handleFilterChange} />
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <LoadingIndicator size="large" />
          </div>
        ) : deals && deals.length > 0 ? (
          <DealsTable deals={deals} onDealSelect={handleDealSelect} />
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-10 text-center mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Сделки не найдены
            </h3>
            <p className="text-gray-500">
              {filters.status !== "all" ||
              filters.search ||
              filters.dateRange.from ||
              filters.dateRange.to
                ? "Попробуйте изменить параметры фильтрации"
                : "У вас пока нет сделок"}
            </p>
          </div>
        )}
      </div>
      {selectedDealId && (
        <DealDetails
          dealId={selectedDealId}
          onClose={handleDealClose}
          onStatusChange={handleRefresh}
        />
      )}
    </div>
  );
}
