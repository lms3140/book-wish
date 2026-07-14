import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";
import { createBook, getWishGenreList } from "../api/books";

import { toast } from "@/lib/toast";

import { FormLayout, FormPanel } from "@/components/layout/Form";
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
  const queryClient = useQueryClient();
  const { control, handleSubmit, reset } = useForm<BookFormType>({
    defaultValues: init,
    resolver: zodResolver(bookAddSchema),
  });

  const { data: genreList } = useQuery({
    queryKey: ["wishBookGenre"],
    queryFn: getWishGenreList,
  });

  const mutation = useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookList"],
      });
      toast.success("등록성공");
      reset(init);
    },
    onError: (error) => {
      toast.error(error.message || "등록 중 오류가 발생했습니다.");
    },
  });

  const bookAddSubmit = (data: BookFormType) => {
    const result = bookAddSchema.parse(data);
    mutation.mutate(result);
  };
  return (
    <FormPanel>
      <FormLayout onSubmit={handleSubmit(bookAddSubmit)}>
        <WishBookFormFields
          control={control}
          genreList={genreList?.data ?? []}
        />
        <div className="flex justify-end">
          <Button type="submit" size={"lg"} disabled={mutation.isPending}>
            {mutation.isPending ? "저장 중..." : "저장"}
          </Button>
        </div>
      </FormLayout>
    </FormPanel>
  );
}
