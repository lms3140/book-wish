import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function BookFilter() {
  return (
    <div className="flex">
      <Field>
        <FieldLabel>책 이름</FieldLabel>
        <Input type="text" placeholder="책 이름" />
      </Field>
      <Field>
        <FieldLabel>장르</FieldLabel>
        <Input type="text" placeholder="장르" />
      </Field>
    </div>
  );
}
