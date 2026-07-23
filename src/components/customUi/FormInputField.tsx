import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";

import { Input } from "@/components/ui/input";

type FormInputFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  autoComplete?: string;
  placeholder?: string;
  id?: string;
};

export function FormInputField<T extends FieldValues>({
  name,
  control,
  label,
  type,
  autoComplete = "off",
  id,
  placeholder,
}: FormInputFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={id} className="text-sm ">
            {label}
            {fieldState.invalid && (
              <FieldError className="text-xs" errors={[fieldState.error]} />
            )}
          </FieldLabel>

          <Input
            {...field}
            id={id}
            aria-invalid={fieldState.invalid}
            autoComplete={autoComplete}
            placeholder={placeholder ?? label}
            type={type}
            value={field.value}
          />
        </Field>
      )}
    />
  );
}
