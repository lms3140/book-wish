import { api } from "@/lib/api";
import axios from "axios";

type OwnedBookCountResponse<T> = {
  message: string;
  data: T;
};

export async function getOwnedBookCount() {
  try {
    const response =
      await api.get<OwnedBookCountResponse<{ count: number }>>(
        "owned-books/count",
      );
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
