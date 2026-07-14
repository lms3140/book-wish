import { RhfPopUpInput } from "@/components/customUi/RhfPopUpInput";
import { FormGrid } from "@/components/layout/Form";
import { FormInputField } from "@/components/ui/FormInputField";
import type { Control, FieldValues } from "react-hook-form";
import type { BookFormType } from "./BookAddForm";

type WishBookFormFieldProps<T extends FieldValues> = {
  control: Control<T>;
  genreList: string[];
};

export function WishBookFormFields({
  control,
  genreList,
}: WishBookFormFieldProps<BookFormType>) {
  return (
    <>
      <FormGrid>
        <FormInputField name="bookTitle" control={control} label="책 제목" />
        <FormInputField name="author" control={control} label="저자" />
        <FormInputField name="publisher" control={control} label="출판사" />
        <RhfPopUpInput
          label="장르"
          control={control}
          name="genre"
          options={genreList}
        />
        <FormInputField name="ISBN" control={control} label="ISBN (선택)" />
      </FormGrid>
    </>
  );
}
