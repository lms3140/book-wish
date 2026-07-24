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
      <FieldLabel className="text-sm">{label}</FieldLabel>
      <FieldContent className="w-full">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              data-empty={!value}
              className="h-10 w-full justify-start rounded-lg bg-background px-3 text-left text-sm font-normal data-[empty=true]:text-muted-foreground"
            >
              <CalendarIcon />
              {value ? format(value, "yyyy-MM-dd") : <span>날짜 선택</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              captionLayout="dropdown"
              selected={value}
              onSelect={onChange}
            />
          </PopoverContent>
        </Popover>
      </FieldContent>
    </Field>
  );
}
