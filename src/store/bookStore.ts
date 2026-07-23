import type { BookDetail } from "@/feature/bookType";
import { create } from "zustand";

type BookStore = {
  book: BookDetail | null;
  setBook: (book: BookDetail) => void;
  clearBook: () => void;
};

export const useBookStore = create<BookStore>((set) => ({
  book: null,

  setBook: (book: BookDetail) =>
    set({ book: { ...book, ISBN: book.ISBN ?? "" } }),

  clearBook: () => set({ book: null }),
}));
