import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { CustomPopup } from "./CustomPopUp";

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
      render={({ field }) => (
        <CustomPopup
          label={label}
          className="w-fit"
          value={field.value}
          onChange={field.onChange}
          options={options}
        />
      )}
    />
  );
}
