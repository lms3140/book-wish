import { Button } from "@/components/ui/button";
import { toast } from "@/lib/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
  createOwnedBook,
  getOwnedGenreList,
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

export function OwnedBookAddForm() {
  const queryClient = useQueryClient();
  const { control, handleSubmit, reset } = useForm<OwnedBookFormType>({
    defaultValues: init,
    resolver: zodResolver(ownedBookSchema),
  });
  const { data: genreList } = useQuery({
    queryKey: ["ownedBookGenre"],
    queryFn: getOwnedGenreList,
  });
  const mutation = useMutation({
    mutationFn: createOwnedBook,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ownedBookList"],
      });
      toast.success("등록 성공");
      reset(init);
    },
    onError: (error) => {
      toast.error(error.message || "등록 중 오류가 발생했습니다.");
    },
  });

  const onSubmit = (data: OwnedBookFormType) => {
    mutation.mutate(data);
  };

  return (
    <FormLayout onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormPanel>
        <OwnedBookFormFields
          control={control}
          genreList={genreList?.data ?? []}
        />
        <div className="flex justify-end">
          <Button type="submit" size={"lg"} disabled={mutation.isPending}>
            {mutation.isPending ? "저장 중..." : "저장"}
          </Button>
        </div>
      </FormPanel>
    </FormLayout>
  );
}
