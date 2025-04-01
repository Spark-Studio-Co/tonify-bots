import { create } from "zustand";

export interface CardItemBase {
  id: number;
  title: string;
  image: string;
  date: string;
  status: string;
}

export interface Ad extends CardItemBase {
  key?: number;
  status: "open" | "closed";
}

export interface Announcement extends CardItemBase {
  description: string;
  price?: number;
  location?: string;
  category: string;
  status: "active" | "inactive";
  featured?: boolean;
}

interface SearchFilters {
  category: string;
  priceRange: [number, number];
  location: string;
  status: string;
  sortBy: "date" | "price" | "relevance";
  sortOrder: "asc" | "desc";
}

interface SearchState {
  // State
  searchQuery: string;
  filters: SearchFilters;
  results: Announcement[];
  isLoading: boolean;
  recentSearches: string[];

  // Actions
  setSearchQuery: (query: string) => void;
  updateFilter: <K extends keyof SearchFilters>(
    filterName: K,
    value: SearchFilters[K]
  ) => void;
  resetFilters: () => void;
  performSearch: () => Promise<void>;
  addToRecentSearches: (query: string) => void;
  clearRecentSearches: () => void;
}

// Mock data for announcements
const mockAnnouncements: Announcement[] = [
  {
    id: 1,
    title: "Продажа автомобиля Nissan Qashqai",
    description:
      "Отличное состояние, один владелец, полный комплект документов",
    price: 1200000,
    location: "Москва",
    category: "Транспорт",
    image: "/placeholder.svg?height=120&width=120",
    date: "12.03.2023",
    status: "active",
    featured: true,
  },
  {
    id: 2,
    title: "Аренда квартиры в центре",
    description:
      "2-комнатная квартира с хорошим ремонтом, вся мебель и техника",
    price: 45000,
    location: "Санкт-Петербург",
    category: "Недвижимость",
    image: "/placeholder.svg?height=120&width=120",
    date: "10.03.2023",
    status: "active",
  },
  {
    id: 3,
    title: "iPhone 13 Pro Max",
    description: "Новый, запечатанный, гарантия 1 год",
    price: 85000,
    location: "Екатеринбург",
    category: "Электроника",
    image: "/placeholder.svg?height=120&width=120",
    date: "08.03.2023",
    status: "active",
  },
  {
    id: 4,
    title: "Репетитор по математике",
    description: "Подготовка к ЕГЭ, опыт работы 10 лет",
    price: 1500,
    location: "Онлайн",
    category: "Услуги",
    image: "/placeholder.svg?height=120&width=120",
    date: "05.03.2023",
    status: "active",
  },
  {
    id: 5,
    title: "Продам диван",
    description: "В хорошем состоянии, самовывоз",
    price: 15000,
    location: "Казань",
    category: "Мебель",
    image: "/placeholder.svg?height=120&width=120",
    date: "01.03.2023",
    status: "inactive",
  },
  {
    id: 6,
    title: "Щенки лабрадора",
    description: "Чистокровные, с документами, привиты",
    price: 35000,
    location: "Новосибирск",
    category: "Животные",
    image: "/placeholder.svg?height=120&width=120",
    date: "28.02.2023",
    status: "active",
    featured: true,
  },
];

// Default filter values
const defaultFilters: SearchFilters = {
  category: "all",
  priceRange: [0, 1000000],
  location: "all",
  status: "all",
  sortBy: "date",
  sortOrder: "desc",
};

export const useSearchStore = create<SearchState>((set, get) => ({
  // Initial state
  searchQuery: "",
  filters: defaultFilters,
  results: [],
  isLoading: false,
  recentSearches: [],

  // Actions
  setSearchQuery: (query) => set({ searchQuery: query }),

  updateFilter: (filterName, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [filterName]: value,
      },
    })),

  resetFilters: () => set({ filters: defaultFilters }),

  performSearch: async () => {
    const { searchQuery, filters, addToRecentSearches } = get();

    // Start loading
    set({ isLoading: true });

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Filter the mock data based on search query and filters
      let filteredResults = [...mockAnnouncements];

      // Apply search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredResults = filteredResults.filter(
          (item) =>
            item.title.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query)
        );

        // Add to recent searches if not empty
        if (searchQuery.trim()) {
          addToRecentSearches(searchQuery);
        }
      }

      // Apply category filter
      if (filters.category !== "all") {
        filteredResults = filteredResults.filter(
          (item) => item.category === filters.category
        );
      }

      // Apply price range filter
      filteredResults = filteredResults.filter(
        (item) =>
          item.price !== undefined &&
          item.price >= filters.priceRange[0] &&
          item.price <= filters.priceRange[1]
      );

      // Apply location filter
      if (filters.location !== "all") {
        filteredResults = filteredResults.filter(
          (item) => item.location === filters.location
        );
      }

      // Apply status filter
      if (filters.status !== "all") {
        filteredResults = filteredResults.filter(
          (item) =>
            item.status ===
            (filters.status === "active" ? "active" : "inactive")
        );
      }

      // Apply sorting
      filteredResults.sort((a, b) => {
        if (filters.sortBy === "date") {
          const dateA = new Date(a.date.split(".").reverse().join("-"));
          const dateB = new Date(b.date.split(".").reverse().join("-"));
          return filters.sortOrder === "asc"
            ? dateA.getTime() - dateB.getTime()
            : dateB.getTime() - dateA.getTime();
        } else if (filters.sortBy === "price") {
          const priceA = a.price || 0;
          const priceB = b.price || 0;
          return filters.sortOrder === "asc"
            ? priceA - priceB
            : priceB - priceA;
        } else {
          // Relevance - featured items first, then by date
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;

          const dateA = new Date(a.date.split(".").reverse().join("-"));
          const dateB = new Date(b.date.split(".").reverse().join("-"));
          return dateB.getTime() - dateA.getTime();
        }
      });

      // Update results
      set({ results: filteredResults });
    } catch (error) {
      console.error("Search error:", error);
      set({ results: [] });
    } finally {
      set({ isLoading: false });
    }
  },

  addToRecentSearches: (query) =>
    set((state) => {
      // Add to recent searches if not already there
      if (!state.recentSearches.includes(query)) {
        const newRecentSearches = [query, ...state.recentSearches].slice(0, 5);
        return { recentSearches: newRecentSearches };
      }
      return {};
    }),

  clearRecentSearches: () => set({ recentSearches: [] }),
}));
