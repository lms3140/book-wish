import type { Book } from "@/feature/bookType";
import { create } from "zustand";

type BookListStore = {
  bookList: Book[];
  addBook: (book: Book) => void;
  deleteBook: (id: string) => void;
  updateBook: (book: Book) => void;
};

export const useBookListStore = create<BookListStore>((set, get) => ({
  bookList: [],

  addBook: (book: Book) =>
    set({
      bookList: [...get().bookList, book],
    }),

  deleteBook: (id: string) =>
    set({
      bookList: get().bookList.filter((book) => book.id !== id),
    }),

  updateBook: (book: Book) =>
    set({
      bookList: get().bookList.map((item) =>
        item.id === book.id ? book : item,
      ),
    }),
}));
