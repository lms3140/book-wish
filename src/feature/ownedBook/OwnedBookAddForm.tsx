import { Button } from "@/components/ui/button";
import { FormInputField } from "@/components/ui/FormInputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { createOwnedBook, type OwnedBookFormType } from "./api/ownedBooks";
import { toast } from "@/lib/toast";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  ownedBookSchema,
  READING_STATUS_LABEL_MAP,
} from "./model/ownedBookSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/customUi/DatePicker";

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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <FormInputField
        id="owner-rhf-book-title"
        name="bookTitle"
        control={control}
        label="책 제목"
      />
      <FormInputField
        id="owner-rhf-author"
        name="author"
        control={control}
        label="저자"
      />
      <FormInputField
        id="owner-rhf-publisher"
        name="publisher"
        control={control}
        label="출판사"
      />
      <FormInputField
        id="owner-rhf-genre"
        name="genre"
        control={control}
        label="장르"
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
      <FormInputField
        id="owner-rhf-isbn"
        name="isbn"
        control={control}
        label="ISBN (선택)"
      />
      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "저장 중..." : "저장"}
      </Button>
    </form>
  );
}
