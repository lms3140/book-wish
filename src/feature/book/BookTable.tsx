import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { api } from "@/lib/api";
import { useBookStore } from "@/store/bookStore";
import { useQuery } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import type { BookDetail, BookResponse } from "../bookType";
import { BookDataTable } from "./BookDataTable";

// data-table로 변경

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
  },
  {
    accessorKey: "author",
    header: "저자",
  },
  {
    accessorKey: "publisher",
    header: "출판사",
  },
  {
    accessorKey: "genre",
    header: "장르",
  },
  {
    accessorKey: "ISBN",
    header: "ISBN",
    cell: ({ row }) => row.original.ISBN ?? "-",
  },
];

export function BookTable() {
  const setBook = useBookStore((state) => state.setBook);
  const { data, isError } = useQuery({
    queryKey: ["bookList"],
    queryFn: async (): Promise<BookResponse> => {
      const { data } = await api.get<BookResponse>("/books");
      return data;
    },
  });

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>오류가 발생</CardTitle>
        </CardHeader>
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
          />
        </CardContent>
      </Card>
    </>
  );
}
