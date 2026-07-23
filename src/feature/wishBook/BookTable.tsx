import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { api } from "@/lib/api";
import { useBookStore } from "@/store/bookStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CircleAlert, RotateCcw } from "lucide-react";
import type { BookDetail, BookResponse } from "../bookType";
import { BookDataTable } from "./BookDataTable";
import { deleteBooks, purchaseWishBook } from "./api/books";

import { toast } from "@/lib/toast";

const columns: ColumnDef<BookDetail>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "id",
    meta: {
      label: "ID",
    },
  },
  {
    accessorKey: "bookTitle",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          책 제목
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    meta: {
      label: "책 제목",
    },
  },
  {
    accessorKey: "author",
    header: "저자",
    meta: {
      label: "저자",
    },
  },
  {
    accessorKey: "publisher",
    header: "출판사",
    meta: {
      label: "출판사",
    },
  },
  {
    accessorKey: "genre",
    header: "장르",
    meta: {
      label: "장르",
    },
  },
  {
    accessorKey: "ISBN",
    header: "ISBN",
    cell: ({ row }) => row.original.ISBN ?? "-",
    meta: {
      label: "ISBN",
    },
  },
];

export function BookTable() {
  const setBook = useBookStore((state) => state.setBook);
  const queryClient = useQueryClient();
  const { data, isError, isFetching, refetch } = useQuery({
    queryKey: ["bookList"],
    queryFn: async (): Promise<BookResponse> => {
      const { data } = await api.get<BookResponse>("/books");
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBooks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookList"] });
      toast.success("삭제되었습니다.");
    },
    onError: (error) => {
      toast.error(error.message || "삭제 중 오류가 발생했습니다.");
    },
  });

  const purchaseMutation = useMutation({
    mutationFn: purchaseWishBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookList"] });
      toast.success("구매처리 성공.");
    },
    onError: (error) => {
      toast.error(error.message || "구매처리중 오류가 발생했습니다.");
    },
  });

  if (isError) {
    return (
      <Card className="min-h-64 justify-center py-8" role="alert">
        <CardHeader className="items-center gap-3 text-center">
          <div className="flex size-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <CircleAlert className="size-5" aria-hidden="true" />
          </div>
          <CardTitle className="text-base">
            도서 목록을 불러오지 못했습니다
          </CardTitle>
          <CardDescription className="max-w-md">
            네트워크 상태를 확인한 후 다시 시도해주세요. 문제가 계속되면 잠시
            후 다시 이용해주세요.
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-center">
          <Button
            variant="outline"
            onClick={() => void refetch()}
            disabled={isFetching}
          >
            <RotateCcw
              className={isFetching ? "animate-spin" : undefined}
              aria-hidden="true"
            />
            <span aria-live="polite">
              {isFetching ? "다시 불러오는 중..." : "다시 시도"}
            </span>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <>
      <Card className="justify-between">
        <CardContent>
          <BookDataTable
            columns={columns}
            data={data ? (data.data ?? []) : []}
            rowClick={setBook}
            onDelete={deleteMutation.mutate}
            onPurchase={purchaseMutation.mutate}
          />
        </CardContent>
      </Card>
    </>
  );
}
