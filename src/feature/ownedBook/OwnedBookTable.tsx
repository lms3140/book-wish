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
    accessorKey: "isbn",
    header: "ISBN",
    cell: ({ row }) => row.original.isbn ?? "-",
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
  },
  {
    accessorKey: "purchasedAt",
    header: "구매일",
    cell: ({ row }) => {
      const date = row.original.purchasedAt;
      return date ? new Date(date).toLocaleDateString() : "-";
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
            rowClick={(book) => setBook(book)}
            onDelete={deleteMutation.mutate}
          />
        </CardContent>
      </Card>
    </>
  );
}
