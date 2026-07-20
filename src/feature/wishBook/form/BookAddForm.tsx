import { FormLayout, FormPanel } from "@/components/layout/Form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { getOwnedBooks } from "@/feature/ownedBook/api/ownedBooks";
import { toast } from "@/lib/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { createBook, getWishGenreList } from "../api/books";
import { WishBookFormFields } from "./WishBookFormFields";

const bookAddSchema = z.object({
  bookTitle: z.string().min(1, "필수 값입니다."),
  author: z.string().min(1, "필수 값입니다."),
  genre: z.string().min(1, "필수 값입니다."),
  publisher: z.string().min(1, "필수 값입니다."),
  ISBN: z
    .string()
    .regex(/^\d+$/, "숫자만 입력할 수 있습니다.")
    .optional()
    .or(z.literal("")),
});

export type BookFormType = z.infer<typeof bookAddSchema>;

const init = {
  bookTitle: "",
  author: "",
  genre: "",
  publisher: "",
  ISBN: "",
};

export function BookAddForm() {
  const [pendingBook, setPendingBook] = useState<BookFormType | null>(null);
  const queryClient = useQueryClient();
  const { control, handleSubmit, reset } = useForm<BookFormType>({
    defaultValues: init,
    resolver: zodResolver(bookAddSchema),
  });

  const { data: genreList } = useQuery({
    queryKey: ["wishBookGenre"],
    queryFn: getWishGenreList,
  });

  const { data: ownedBookList } = useQuery({
    queryKey: ["ownedBookList"],
    queryFn: getOwnedBooks,
  });

  const mutation = useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookList"],
      });
      toast.success("등록 성공");
      reset(init);
    },
    onError: (error) => {
      toast.error(error.message || "등록 중 오류가 발생했습니다.");
    },
  });

  const bookAddSubmit = (data: BookFormType) => {
    const result = bookAddSchema.parse(data);
    const isDuplicateOwnedBook = ownedBookList?.data.some(
      (book) => book.bookTitle.trim() === result.bookTitle.trim(),
    );

    if (isDuplicateOwnedBook) {
      setPendingBook(result);
      return;
    }

    mutation.mutate(result);
  };

  const confirmSubmit = () => {
    if (!pendingBook) return;

    mutation.mutate(pendingBook);
    setPendingBook(null);
  };

  const cancelSubmit = () => {
    setPendingBook(null);
  };

  return (
    <FormLayout onSubmit={handleSubmit(bookAddSubmit)}>
      <FormPanel>
        <WishBookFormFields
          control={control}
          genreList={genreList?.data ?? []}
        />
        <div className="flex justify-end">
          <Button type="submit" size={"lg"} disabled={mutation.isPending}>
            {mutation.isPending ? "저장 중.." : "저장"}
          </Button>
        </div>
      </FormPanel>
      <AlertDialog
        open={pendingBook !== null}
        onOpenChange={(open) => {
          if (!open) setPendingBook(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>이미 소장도서에 있는 책입니다!</AlertDialogTitle>
            <AlertDialogDescription>
              위시리스트에 등록하시겠습니까?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelSubmit}>취소</AlertDialogCancel>
            <AlertDialogAction onClick={confirmSubmit}>등록</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </FormLayout>
  );
}
