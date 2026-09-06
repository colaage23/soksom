import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ISearchKeyword {
  searchKeyword: string;
  recentSearches: string[];
  setSearchKeyword: (keyword: string) => void;
  addRecentSearch: (keyword: string) => void;
}

const MAX_RECENT_SEARCHES = 6;

const normalizeKeyword = (keyword: string) => keyword.trim();

export const useSearchKeywordStore = create<ISearchKeyword>()(
  persist(
    (set) => ({
      searchKeyword: "",
      recentSearches: [],
      setSearchKeyword: (keyword) =>
        set({ searchKeyword: normalizeKeyword(keyword) }),
      addRecentSearch: (keyword) => {
        const normalizedKeyword = normalizeKeyword(keyword);

        if (!normalizedKeyword) return;

        set((state) => ({
          recentSearches: [
            normalizedKeyword,
            ...state.recentSearches.filter(
              (item) => item !== normalizedKeyword,
            ),
          ].slice(0, MAX_RECENT_SEARCHES),
        }));
      },
    }),
    {
      name: "soksom-recent-searches",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ recentSearches: state.recentSearches }),
    },
  ),
);
