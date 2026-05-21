import { Button } from "@/components/ui/button";
import { FormInputField } from "@/components/ui/FormInputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";
import { createBook } from "./api/books";

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
  const queryClient = useQueryClient();
  const { control, handleSubmit, reset } = useForm<BookFormType>({
    defaultValues: init,
    resolver: zodResolver(bookAddSchema),
  });

  const mutation = useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookList"],
      });
      alert("등록성공");
      reset(init);
    },
    onError: (error) => {
      alert(error.message || "등록 중 오류가 발생했습니다.");
    },
  });

  const bookAddSubmit = (data: BookFormType) => {
    const result = bookAddSchema.parse(data);
    mutation.mutate(result);
  };
  return (
    <form
      onSubmit={handleSubmit(bookAddSubmit)}
      className="flex flex-col gap-2"
    >
      <FormInputField name="bookTitle" control={control} label="책 제목" />
      <FormInputField name="author" control={control} label="저자" />
      <FormInputField name="publisher" control={control} label="출판사" />
      <FormInputField name="genre" control={control} label="장르" />
      <FormInputField name="ISBN" control={control} label="ISBN (선택)" />
      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "저장 중..." : "저장"}
      </Button>
    </form>
  );
}
