import { cn } from "@/lib/utils";

export function FormLayout({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return <form className={cn("space-y-6", className)} {...props} />;
}

export function FormPanel({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "bg-transparent *:data-[slot=form-actions]:mt-6 *:data-[slot=form-actions]:flex *:data-[slot=form-actions]:justify-end *:data-[slot=form-actions]:border-t *:data-[slot=form-actions]:border-border/60 *:data-[slot=form-actions]:pt-5",
        className,
      )}
      {...props}
    />
  );
}

export function FormGrid({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
      {...props}
    ></div>
  );
}
