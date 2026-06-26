"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Field, FieldContent, FieldLabel } from "../ui/field";

type DatePickerProps = {
  label?: string;
  value?: Date;
  onChange: (date: Date | undefined) => void;
};

export function DatePicker({ value, onChange, label }: DatePickerProps) {
  return (
    <Field>
      <FieldLabel className="text-sm ">{label}</FieldLabel>
      <FieldContent>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              data-empty={!value}
              className="justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
            >
              <CalendarIcon />
              {value ? format(value, "yyyy-MM-dd") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={value} onSelect={onChange} />
          </PopoverContent>
        </Popover>
      </FieldContent>
    </Field>
  );
}
