import { cn } from "@/lib/utils";

export function PageContainer({
  className,
  ...props
}: React.ComponentProps<"main">) {
  return (
    <main
      className={cn(
        "min-w-3xs mx-auto w-full max-w-360 px-4 py-6 flex-col",
        className,
      )}
      {...props}
    />
  );
}

export function PageContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("space-y-6", className)} {...props} />;
}
