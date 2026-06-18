import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";

type BookPaginationProps = {
  currentPage: number;
  countPerPage: number;
  totalCount: number;
  onClick: (page: number) => void;
};
export function BookPagination({
  currentPage, // 현재 선택된 페이지
  countPerPage,
  onClick,
  totalCount,
}: BookPaginationProps) {
  const [currentGroup, setCurrentGroup] = useState(1);
  const pageGroupSize = 5;
  const totalPages = Math.ceil(totalCount / countPerPage);
  const startPage = (currentGroup - 1) * pageGroupSize + 1;
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);

  const totalGroups = Math.ceil(totalPages / pageGroupSize);

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              setCurrentGroup((prev) => (prev > 1 ? prev - 1 : prev));
            }}
          />
        </PaginationItem>
        {pages.map((v) => (
          <PaginationItem key={v}>
            <PaginationLink
              isActive={v - 1 === currentPage}
              onClick={() => {
                onClick(v - 1);
              }}
            >
              {v}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            onClick={() => {
              setCurrentGroup((prev) => (prev < totalGroups ? prev + 1 : prev));
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
