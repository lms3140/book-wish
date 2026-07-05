import * as React from "react";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";
import { buttonVariants, type ButtonSize, type ButtonVariant } from "./button-variants";

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  {
    variant?: ButtonVariant;
    size?: ButtonSize;
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button };
