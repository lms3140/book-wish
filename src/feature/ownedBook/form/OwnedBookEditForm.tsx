import { Button } from "@/components/ui/button";
import { toast } from "@/lib/toast";
import { useOwnedBookStore } from "@/store/ownedBookStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  getOwnedGenreList,
  updateOwnedBook,
  type OwnedBookFormType,
} from "../api/ownedBooks";
import { ownedBookSchema } from "../model/ownedBookSchema";
import { OwnedBookFormFields } from "./OwnedBookFormFields";
import { FormLayout, FormPanel } from "@/components/layout/Form";

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

export function OwnedBookEditForm() {
  const target = useOwnedBookStore((state) => state.ownedBook);
  const queryClient = useQueryClient();
  const { control, handleSubmit, reset } = useForm<OwnedBookFormType>({
    defaultValues: target
      ? {
          bookTitle: target.bookTitle,
          author: target.author,
          genre: target.genre,
          publisher: target.publisher,
          isbn: target.isbn ?? "",
          shortReview: target.shortReview ?? "",
          readingStatus: target.readingStatus,
          purchasedAt: new Date(target.purchasedAt),
        }
      : init,
    resolver: zodResolver(ownedBookSchema),
  });
  const { data: genreList } = useQuery({
    queryKey: ["ownedBookGenre"],
    queryFn: getOwnedGenreList,
  });
  useEffect(() => {
    if (target) {
      reset({
        bookTitle: target.bookTitle,
        author: target.author,
        genre: target.genre,
        publisher: target.publisher,
        isbn: target.isbn ?? "",
        shortReview: target.shortReview ?? "",
        readingStatus: target.readingStatus,
        purchasedAt: new Date(target.purchasedAt),
      });
    }
  }, [target, reset]);

  const mutation = useMutation({
    mutationFn: updateOwnedBook,
    onSuccess: (d) => {
      console.log(d);
      queryClient.invalidateQueries({ queryKey: ["ownedBookList"] });
      toast.success("수정 성공");
    },
    onError: (error) => {
      toast.error(error.message || "수정 중 오류가 발생했습니다.");
    },
  });

  const onSubmit = (data: OwnedBookFormType) => {
    if (!target) return;
    mutation.mutate({ id: target.id, ...data });
  };

  return (
    <FormLayout onSubmit={handleSubmit(onSubmit)}>
      <FormPanel>
        <OwnedBookFormFields
          control={control}
          genreList={genreList?.data ?? []}
        />
        <div className="flex justify-end">
          <Button type="submit" size={"lg"} disabled={mutation.isPending}>
            {mutation.isPending ? "수정 중..." : "수정"}
          </Button>
        </div>
      </FormPanel>
    </FormLayout>
  );
}
