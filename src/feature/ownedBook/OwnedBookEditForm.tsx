import { Button } from "@/components/ui/button";
import { FormInputField } from "@/components/ui/FormInputField";
import { useOwnedBookStore } from "@/store/ownedBookStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  getOwnedGenreList,
  updateOwnedBook,
  type OwnedBookFormType,
} from "./api/ownedBooks";
import { toast } from "@/lib/toast";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ownedBookSchema,
  READING_STATUS_LABEL_MAP,
} from "./model/ownedBookSchema";
import { DatePicker } from "@/components/customUi/DatePicker";
import { RhfPopUpInput } from "@/components/customUi/RhfPopUpInput";

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
    onSuccess: () => {
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <FormInputField name="bookTitle" control={control} label="책 제목" />
      <FormInputField name="author" control={control} label="저자" />
      <FormInputField name="publisher" control={control} label="출판사" />
      <RhfPopUpInput
        control={control}
        name="genre"
        label="장르"
        options={genreList?.data ?? []}
      />
      <FormInputField name="shortReview" control={control} label="짧은평" />
      <Controller
        name="readingStatus"
        control={control}
        render={({ field, fieldState }) => (
          <Field orientation="responsive" data-invalid={fieldState.invalid}>
            <FieldLabel
              htmlFor="owner-rhf-reading-status"
              className="text-sm font-bold"
            >
              독서 상태
            </FieldLabel>
            <Select
              name={field.name}
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger id="owner-rhf-reading-status">
                <SelectValue placeholder="독서상태" />
              </SelectTrigger>
              <SelectContent position="item-aligned">
                {Object.entries(READING_STATUS_LABEL_MAP).map(
                  ([status, label]) => {
                    return (
                      <SelectItem key={status} value={status}>
                        {label}
                      </SelectItem>
                    );
                  },
                )}
              </SelectContent>
            </Select>
          </Field>
        )}
      />

      <Controller
        name="purchasedAt"
        control={control}
        render={({ field }) => (
          <DatePicker
            label="구매일"
            onChange={field.onChange}
            value={field.value}
          />
        )}
      />
      <FormInputField name="isbn" control={control} label="ISBN (선택)" />

      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "수정 중..." : "수정"}
      </Button>
    </form>
  );
}
