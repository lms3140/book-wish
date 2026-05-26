import { api } from "@/lib/api";
import type { BookFormType } from "../BookAddForm";
import axios from "axios";

type BookResponse<T> = {
  message: string;
  data: T;
};

export async function createBook({
  author,
  bookTitle,
  genre,
  publisher,
  ISBN,
}: BookFormType) {
  try {
    const { data } = await api.post<BookResponse<string>>("/books", {
      author,
      bookTitle,
      genre,
      publisher,
      ISBN,
    });

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "도서 등록에 실패했습니다.",
        {
          cause: error,
        },
      );
    }
  }
}

type UpdateBookParams = {
  id: string;
} & BookFormType;

export async function updateBook({
  id,
  author,
  bookTitle,
  genre,
  publisher,
  ISBN,
}: UpdateBookParams) {
  try {
    const { data } = await api.post<BookResponse<string>>(
      `/books/${id}/update`,
      {
        id,
        author,
        bookTitle,
        genre,
        publisher,
        ISBN,
      },
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "도서 등록에 실패했습니다.",
        { cause: error },
      );
    }
  }
}

export async function deleteBook(bookId: string) {
  try {
    const { data } = await api.post<BookResponse<string>>(
      `/books/${bookId}/delete`,
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "삭제에 실패했습니다.", {
        cause: error,
      });
    } else {
      throw new Error("알수 없는 에러가 발생", { cause: error });
    }
  }
}

export async function deleteBooks(bookIds: string[]) {
  try {
    const { data } = await api.post<BookResponse<string>>(
      "/books/delete-multiple",
      {
        ids: bookIds,
      },
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "도서 삭제에 실패했습니다.",
        {
          cause: error,
        },
      );
    }
    throw error;
  }
}
