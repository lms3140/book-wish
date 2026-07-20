import { api } from "@/lib/api";
import type { OwnedBook, ReadingStatus } from "../../bookType";
import axios from "axios";

type OwnedBookResponse<T> = {
  message: string;
  data: T;
};

export type OwnedBookFormType = Omit<OwnedBook, "id" | "userId" | "bookId">;

export async function getOwnedBooks() {
  try {
    const { data } =
      await api.get<OwnedBookResponse<OwnedBook[]>>("/owned-books");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message ||
          "소장 도서 목록을 불러오는데 실패했습니다.",
        { cause: error },
      );
    }
    throw error;
  }
}

type GenreCountData = {
  genre: string;
  count: number;
};

export async function getGenreCount() {
  try {
    const { data } = await api.get<OwnedBookResponse<GenreCountData[]>>(
      "/owned-books/genre-counts",
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "장르 개수 불러오기를 실패했습니다.",
        {
          cause: error,
        },
      );
    }
    throw error;
  }
}

export async function createOwnedBook(formData: OwnedBookFormType) {
  try {
    const { data } = await api.post<OwnedBookResponse<string>>(
      "/owned-books",
      formData,
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "소장 도서 등록에 실패했습니다.",
        { cause: error },
      );
    }
    throw error;
  }
}

type UpdateOwnedBookParams = {
  id: string;
} & OwnedBookFormType;

export async function updateOwnedBook({
  id,
  ...formData
}: UpdateOwnedBookParams) {
  try {
    const { data } = await api.post<OwnedBookResponse<string>>(
      `/owned-books/${id}/update`,
      { id, ...formData },
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "소장 도서 수정에 실패했습니다.",
        { cause: error },
      );
    }
    throw error;
  }
}

export async function deleteOwnedBooks(ids: string[]) {
  try {
    const { data } = await api.post<OwnedBookResponse<string>>(
      "/owned-books/delete-multiple",
      { ids },
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "소장 도서 삭제에 실패했습니다.",
        { cause: error },
      );
    }
    throw error;
  }
}

export async function getOwnedGenreList(): Promise<
  OwnedBookResponse<string[]>
> {
  try {
    const response = await api.get<OwnedBookResponse<string[]>>(
      "owned-books/genre-list",
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "장르 리스트 불러오기를 실패했습니다..",
        { cause: error },
      );
    }
    throw error;
  }
}

type ReadingStatusData = { readingStatus: ReadingStatus; count: number };
export async function getReadingStatusCount() {
  try {
    const response = await api.get<
      OwnedBookResponse<ReadingStatusData[] | ReadingStatusData>
    >("owned-books/reading-status-counts");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "책읽기갯수 불러오기 실패",
        { cause: error },
      );
    }
    throw error;
  }
}
