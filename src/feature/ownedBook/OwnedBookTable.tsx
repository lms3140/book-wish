import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useOwnedBookStore } from "@/store/ownedBookStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import type { OwnedBook } from "../bookType";
import { OwnedBookDataTable } from "./OwnedBookDataTable";
import { toast } from "@/lib/toast";
import { getOwnedBooks, deleteOwnedBooks } from "./api/ownedBooks";

const columns: ColumnDef<OwnedBook>[] = [
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
    accessorKey: "short_review",
    header: "짧은 평",
    cell: ({ row }) => row.original.shortReview ?? "-",
    meta: {
      label: "짧은 평",
    },
  },
  {
    accessorKey: "isbn",
    header: "ISBN",
    cell: ({ row }) => row.original.isbn ?? "-",
    meta: {
      label: "ISBN",
    },
  },
  {
    accessorKey: "readingStatus",
    header: "상태",
    cell: ({ row }) => {
      const status = row.original.readingStatus;
      const statusMap: Record<string, string> = {
        OWNED: "소장 중",
        READING: "읽는 중",
        COMPLETED: "완독",
        ABANDONED: "읽기 보류됨",
        ABANDONED_READING: "읽던중 중단",
      };
      return statusMap[status] || status;
    },
    meta: {
      label: "상태",
    },
  },
  {
    accessorKey: "purchasedAt",
    header: "구매일",
    cell: ({ row }) => {
      const date = row.original.purchasedAt;
      return date ? new Date(date).toLocaleDateString() : "-";
    },
    meta: {
      label: "구매일",
    },
  },
];

export function OwnedBookTable() {
  const setBook = useOwnedBookStore((state) => state.setOwnedBook);
  const queryClient = useQueryClient();

  const { data, isError } = useQuery({
    queryKey: ["ownedBookList"],
    queryFn: getOwnedBooks,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteOwnedBooks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ownedBookList"] });
      toast.success("삭제되었습니다.");
    },
    onError: (error) => {
      toast.error(error.message || "삭제 중 오류가 발생했습니다.");
    },
  });

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>오류가 발생했습니다.</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <>
      <Card className="justify-between">
        <CardContent>
          <OwnedBookDataTable
            columns={columns}
            data={data ? (data.data ?? []) : []}
            rowClick={(book) => {
              console.log(book);
              setBook(book);
            }}
            onDelete={deleteMutation.mutate}
          />
        </CardContent>
      </Card>
    </>
  );
}
