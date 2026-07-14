import { DatePicker } from "@/components/customUi/DatePicker";
import { RhfPopUpInput } from "@/components/customUi/RhfPopUpInput";
import { FormGrid } from "@/components/layout/Form";
import { Field, FieldLabel } from "@/components/ui/field";
import { FormInputField } from "@/components/ui/FormInputField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, type Control, type FieldValues } from "react-hook-form";
import type { OwnedBookFormType } from "../api/ownedBooks";
import { READING_STATUS_LABEL_MAP } from "../model/ownedBookSchema";

type OwnedBookFormFieldProps<T extends FieldValues> = {
  control: Control<T>;
  genreList: string[];
};
export function OwnedBookFormFields({
  control,
  genreList,
}: OwnedBookFormFieldProps<OwnedBookFormType>) {
  return (
    <>
      <FormGrid>
        <FormInputField
          id="owner-rhf-book-title"
          name="bookTitle"
          control={control}
          label="책 제목"
          placeholder="책 제목"
        />
        <FormInputField
          id="owner-rhf-author"
          name="author"
          placeholder="저자"
          control={control}
          label="저자"
        />
        <FormInputField
          id="owner-rhf-publisher"
          name="publisher"
          placeholder="출판사"
          control={control}
          label="출판사"
        />
        <RhfPopUpInput
          control={control}
          name="genre"
          label="장르"
          options={genreList ?? []}
        />

        <FormInputField
          name="shortReview"
          placeholder="짧은평"
          control={control}
          label="짧은평"
        />

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
      </FormGrid>
    </>
  );
}
