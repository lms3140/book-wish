import { FormInputField } from "@/components/ui/FormInputField";
import { Button } from "@/components/ui/button";
import { useBookStore } from "@/store/bookStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { updateBook } from "./api/books";
import { bookKeys } from "./querykey/bookQueryKey";

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

  useEffect(() => {
    if (!target) return;
    reset(target);
  }, [target, reset]);

  const bookEditSubmit = (data: BookEditFormType) => {
    const result = bookEditSchema.parse(data);
    if (!target) return;

    updateBook({ id: target.id, ...result });

    queryClient.invalidateQueries({ queryKey: bookKeys.bookList });
  };

  return (
    <form
      onSubmit={handleSubmit(bookEditSubmit)}
      className="flex flex-col gap-2"
    >
      <FormInputField name="bookTitle" control={control} label="책 제목" />
      <FormInputField name="author" control={control} label="저자" />
      <FormInputField name="publisher" control={control} label="출판사" />
      <FormInputField name="genre" control={control} label="장르" />
      <FormInputField name="ISBN" control={control} label="ISBN (선택)" />
      <Button type="submit">수정</Button>
    </form>
  );
}
