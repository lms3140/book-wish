import { Button } from "@/components/ui/button";
import { toast } from "@/lib/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
  createOwnedBook,
  getOwnedBooks,
  getOwnedGenreList,
  type OwnedBookFormType,
} from "../api/ownedBooks";
import { ownedBookSchema } from "../model/ownedBookSchema";
import { OwnedBookFormFields } from "./OwnedBookFormFields";
import { FormLayout, FormPanel } from "@/components/layout/Form";
import { useState } from "react";
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

const init: OwnedBookFormType = {
  bookTitle: "",
  author: "",
  genre: "",
  publisher: "",
  isbn: "",
  shortReview: "",
  readingStatus: "OWNED",
  purchasedAt: new Date(),
};

export function OwnedBookAddForm() {
  const [pendingBook, setPendingBook] = useState<OwnedBookFormType | null>(
    null,
  );
  const queryClient = useQueryClient();
  const { control, handleSubmit, reset } = useForm<OwnedBookFormType>({
    defaultValues: init,
    resolver: zodResolver(ownedBookSchema),
  });
  const { data: genreList } = useQuery({
    queryKey: ["ownedBookGenre"],
    queryFn: getOwnedGenreList,
  });

  const { data: bookList } = useQuery({
    queryKey: ["ownedBookList"],
    queryFn: getOwnedBooks,
  });

  const mutation = useMutation({
    mutationFn: createOwnedBook,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["ownedBookList"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["ownedBookGenre"],
        }),
      ]);

      toast.success("등록 성공");
      reset(init);
    },
    onError: (error) => {
      toast.error(error.message || "등록 중 오류가 발생했습니다.");
    },
  });

  const onSubmit = (data: OwnedBookFormType) => {
    const isDuplicate = bookList?.data.some(
      (book) => book.bookTitle.trim() === data.bookTitle.trim(),
    );
    if (isDuplicate) {
      setPendingBook(data);
      return;
    }

    mutation.mutate(data);
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
    <FormLayout onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormPanel>
        <OwnedBookFormFields
          control={control}
          genreList={genreList?.data ?? []}
        />
        <div data-slot="form-actions">
          <Button type="submit" size={"lg"} disabled={mutation.isPending}>
            {mutation.isPending ? "저장 중..." : "저장"}
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
            <AlertDialogTitle>중복되는 책 제목이 있습니다!</AlertDialogTitle>
            <AlertDialogDescription>등록하시겠습니까?</AlertDialogDescription>
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
