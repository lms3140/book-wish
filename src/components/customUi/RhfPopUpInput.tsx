import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { CustomPopup } from "./CustomPopUp";
import { Field, FieldError, FieldLabel } from "../ui/field";

type RhfPopUpInput<T extends FieldValues> = {
  control: Control<T>;
  options: string[] | [];
  name: Path<T>;
  label: string;
};

export function RhfPopUpInput<T extends FieldValues>({
  control,
  options,
  name,
  label,
}: RhfPopUpInput<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name} className="text-sm ">
            {label}
            {fieldState.invalid && (
              <FieldError className="text-xs" errors={[fieldState.error]} />
            )}
          </FieldLabel>
          <CustomPopup
            label={label}
            className="w-fit"
            value={field.value}
            onChange={field.onChange}
            options={options}
          />
        </Field>
      )}
    />
  );
}
