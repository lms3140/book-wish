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

import { toast } from "@/lib/toast";

import { CustomAlertDialog } from "@/components/customUi/CustomAlertDialog";

interface DataTableProps<TValue> {
  columns: ColumnDef<BookDetail, TValue>[];
  data: BookDetail[];
  rowClick: (data: BookDetail) => void;
  onDelete?: (ids: string[]) => void;
  onPurchase: (ids: string[]) => void;
}
export function BookDataTable<TValue>({
  columns,
  data,
  rowClick,
  onDelete,
  onPurchase,
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
  const clearBook = useBookStore((state) => state.clearBook);
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
      toast.info("선택된 책이 없습니다.");
      return;
    }

    const text = selectedBooks
      .map((book, index) => formatBookCopy(book, index))
      .join("\n\n");

    await navigator.clipboard.writeText(`도서 목록\n\n${text}`);
    toast.success("선택한 책 정보가 클립보드에 복사되었습니다.");
  };

  const handleDelete = () => {
    const selectedIds = table
      .getSelectedRowModel()
      .rows.map((row) => row.original.id);

    onDelete?.(selectedIds);
    clearBook();
    table.resetRowSelection();
  };

  const handlePurchase = () => {
    const selectedIds = table
      .getSelectedRowModel()
      .rows.map((row) => row.original.id);

    onPurchase?.(selectedIds);
    clearBook();
    table.resetRowSelection();
  };

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center gap-3 rounded-xl border border-border/60 bg-muted/25 p-3">
        <div className="flex flex-1 flex-wrap gap-2">
          <Input
            placeholder="책 제목 필터"
            value={
              (table.getColumn("bookTitle")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("bookTitle")?.setFilterValue(event.target.value)
            }
            className="min-w-56 flex-1 bg-background sm:max-w-xs"
          />
          <Input
            placeholder="장르 필터"
            value={(table.getColumn("genre")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("genre")?.setFilterValue(event.target.value)
            }
            className="min-w-56 flex-1 bg-background sm:max-w-xs"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={handleCopy}>복사</Button>
          <CustomAlertDialog
            buttonText="삭제"
            dialogTitle="도서 삭제"
            description={`선택한 ${table.getSelectedRowModel().rows.length}권의 책을
                삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`}
            actionFn={handleDelete}
            disabled={table.getSelectedRowModel().rows.length === 0}
            variant={"destructive"}
            actionText="삭제"
          />
          <CustomAlertDialog
            buttonText="구매"
            dialogTitle="도서 구매"
            description={`선택한 ${table.getSelectedRowModel().rows.length}권의 책을
                구매처리 하시겠습니까?`}
            actionFn={handlePurchase}
            disabled={table.getSelectedRowModel().rows.length === 0}
            actionText="구매"
            variant={"secondary"}
          />
        </div>
        <div className="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">열 설정</Button>
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
                      {column.columnDef.meta?.label ?? column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-border/70 bg-card">
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
                    ? "bg-amber-50/80 dark:bg-amber-900/20"
                    : "bg-primary/10";

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
      <div className="flex items-center justify-end space-x-2 pt-5">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          이전
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          다음
        </Button>
      </div>
    </div>
  );
}
