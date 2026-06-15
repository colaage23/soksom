import { create } from "zustand";

interface ISearchKeyword {
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
}

export const useSearchKeywordStore = create<ISearchKeyword>((set) => ({
  searchKeyword: "",
  setSearchKeyword: (keyword) => set({ searchKeyword: keyword }),
}));
