import { useState } from "react";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea } from "../ui/scroll-area";

type CustomPopupProps = {
  value?: string;
  label?: string;
  invalid?: boolean;
  onChange: (value: string) => void;
  options?: string[];
};

export function CustomPopup({
  value,
  label = "값",
  invalid = false,
  onChange,
  options = [],
}: CustomPopupProps) {
  const [searchText, setSearchText] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const selectedValue = value ?? "";

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchText.toLowerCase()),
  );

  const selectValue = (nextValue: string) => {
    onChange(nextValue);
    setIsOpen(false);
    setSearchText("");
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <div className="grid w-full gap-2">
        <PopoverTrigger asChild>
          <Input
            className="h-10 w-full cursor-pointer"
            value={selectedValue}
            readOnly
            aria-invalid={invalid}
            placeholder={`${label} 선택`}
          />
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-(--radix-popover-trigger-width) min-w-64">
        <Input
          className="h-10"
          placeholder={`${label} 검색 또는 직접 입력`}
          value={searchText}
          onKeyDown={(e) => {
            if (e.nativeEvent.isComposing) return;
            if (e.key !== "Enter") return;

            e.preventDefault();

            const nextValue = searchText.trim();
            if (!nextValue) return;

            selectValue(nextValue);
          }}
          onChange={(e) => setSearchText(e.currentTarget.value)}
        />

        <ScrollArea className="h-48">
          <div className="p-4">
            {filteredOptions.map((option) => (
              <div
                key={option}
                className="cursor-pointer rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
                onClick={() => selectValue(option)}
              >
                {option}
              </div>
            ))}

            {filteredOptions.length === 0 && (
              <div className="px-2 py-1.5 text-sm text-muted-foreground">
                추천 값이 없습니다.
              </div>
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
