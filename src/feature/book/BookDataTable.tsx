import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import { useState } from "react";
import type { BookDetail } from "../bookType";
import { useBookStore } from "@/store/bookStore";
import { useSidePanelStore } from "@/store/sidePanelStore";

interface DataTableProps<TValue> {
  columns: ColumnDef<BookDetail, TValue>[];
  data: BookDetail[];
  rowClick: (data: BookDetail) => void;
  onDelete?: (ids: string[]) => void;
}
export function BookDataTable<TValue>({
  columns,
  data,
  rowClick,
  onDelete,
}: DataTableProps<TValue>) {
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "bookTitle",
      desc: false,
    },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    id: false,
  });
  const [rowSelection, setRowSelection] = useState({});

  const selectedBook = useBookStore((state) => state.book);
  const panelMode = useSidePanelStore((state) => state.mode);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const formatBookCopy = (book: BookDetail, index: number) => {
    return `${index + 1}. ${book.bookTitle} 
- 저자: ${book.author}
- 출판사: ${book.publisher}
- 장르: ${book.genre}`;
  };

  const handleCopy = async () => {
    const selectedBooks = table
      .getSelectedRowModel()
      .rows.map((row) => row.original);

    if (selectedBooks.length <= 0) {
      alert("선택된 책이 없습니다.");
      return;
    }

    const text = selectedBooks
      .map((book, index) => formatBookCopy(book, index))
      .join("\n\n");

    await navigator.clipboard.writeText(`도서 목록\n\n${text}`);
  };

  const handleDelete = () => {
    const selectedIds = table
      .getSelectedRowModel()
      .rows.map((row) => row.original.id);

    if (selectedIds.length <= 0) {
      alert("선택된 책이 없습니다.");
      return;
    }

    if (confirm(`선택한 ${selectedIds.length}권의 책을 삭제하시겠습니까?`)) {
      onDelete?.(selectedIds);
      table.resetRowSelection();
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 py-4">
        <Input
          placeholder="책 제목 필터"
          value={
            (table.getColumn("bookTitle")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("bookTitle")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Input
          placeholder="장르 필터"
          value={(table.getColumn("genre")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("genre")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Button onClick={handleCopy}>복사</Button>
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={table.getSelectedRowModel().rows.length === 0}
        >
          삭제
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                const isSelected = selectedBook?.id === row.original.id;
                const highlightClass =
                  panelMode === "edit"
                    ? "bg-amber-50 dark:bg-amber-900/20"
                    : "bg-muted";

                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => {
                      rowClick(row.original);
                    }}
                    className={isSelected ? highlightClass : ""}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
