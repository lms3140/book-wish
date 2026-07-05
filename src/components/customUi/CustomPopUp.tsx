import { useState } from "react";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea } from "../ui/scroll-area";
import { Label } from "../ui/label";

type CustomPopupProps = {
  value?: string;
  label?: string;
  onChange: (value: string) => void;
  className?: string;
  options?: string[];
};

export function CustomPopup({
  value,
  onChange,
  className,
  label,
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
      <Label className="text-sm ">{label}</Label>
      <PopoverTrigger asChild>
        <Input value={selectedValue} readOnly />
      </PopoverTrigger>
      <PopoverContent className={className}>
        <Input
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
