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
      className={cn("rounded-lg border bg-card px-4 py-6", className)}
      {...props}
    />
  );
}

export function FormGrid({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("grid grid-cols-4 gap-4 md:grid-cols-2", className)}
      {...props}
    ></div>
  );
}
