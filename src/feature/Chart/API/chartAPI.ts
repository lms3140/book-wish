import type { ReadingStatus } from "@/feature/bookType";
import { api } from "@/lib/api";
import axios from "axios";

type ChartResponse<T> = {
  message: string;
  data: T;
  empty: boolean;
};

export async function getOwnedBookCount() {
  try {
    const response =
      await api.get<ChartResponse<{ count: number }>>("owned-books/count");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "총 도서수 불러오기 실패",
        { cause: error },
      );
    }
    throw error;
  }
}

type ReadingStatusData = { readingStatus: ReadingStatus; count: number };
export async function getReadingStatusCount() {
  try {
    const response = await api.get<ChartResponse<ReadingStatusData[]>>(
      "owned-books/reading-status-counts",
    );
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

type GenreCountData = {
  genre: string;
  count: number;
};

export async function getGenreCount() {
  try {
    const { data } = await api.get<ChartResponse<GenreCountData[]>>(
      "/owned-books/genre-counts",
    );
    console.log(data);
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
