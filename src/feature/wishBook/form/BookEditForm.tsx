import { Button } from "@/components/ui/button";
import { useBookStore } from "@/store/bookStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { getWishGenreList, updateBook } from "../api/books";
import { bookKeys } from "../querykey/bookQueryKey";

import { FormLayout, FormPanel } from "@/components/layout/Form";
import { toast } from "@/lib/toast";
import { WishBookFormFields } from "./WishBookFormFields";

const bookEditSchema = z.object({
  bookTitle: z.string().min(1, "bookTitle is required."),
  author: z.string().min(1, "author is required."),
  genre: z.string().min(1, "genre is required."),
  publisher: z.string().min(1, "publisher is required."),
  ISBN: z
    .string()
    .regex(/^\d+$/, "ISBN must contain numbers only.")
    .optional()
    .or(z.literal("")),
});

type BookEditFormType = z.infer<typeof bookEditSchema>;

const init: BookEditFormType = {
  bookTitle: "",
  author: "",
  genre: "",
  publisher: "",
  ISBN: "",
};

export function BookEditForm() {
  const target = useBookStore((state) => state.book);
  const { control, handleSubmit, reset } = useForm<BookEditFormType>({
    defaultValues: target ?? init,
    resolver: zodResolver(bookEditSchema),
  });
  const queryClient = useQueryClient();
  const { data: genreList } = useQuery({
    queryKey: ["wishBookGenre"],
    queryFn: getWishGenreList,
  });

  useEffect(() => {
    if (!target) return;
    reset(target);
  }, [target, reset]);

  const mutation = useMutation({
    mutationFn: updateBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookKeys.bookList });
      toast.success("수정 성공");
    },
    onError: (error) => {
      toast.error(error.message || "수정 중 오류가 발생했습니다.");
    },
  });

  const bookEditSubmit = (data: BookEditFormType) => {
    const result = bookEditSchema.parse(data);
    if (!target) return;

    mutation.mutate({ id: target.id, ...result });
  };

  return (
    <FormLayout
      onSubmit={handleSubmit(bookEditSubmit)}
      className="flex flex-col gap-2"
    >
      <FormPanel>
        <WishBookFormFields
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
