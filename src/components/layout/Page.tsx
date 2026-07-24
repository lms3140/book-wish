import { cn } from "@/lib/utils";

export function PageContainer({
  className,
  ...props
}: React.ComponentProps<"main">) {
  return (
    <main
      className={cn(
        "mx-auto w-full min-w-0 max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8",
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
  return (
    <div
      className={cn(
        "space-y-8 *:data-[slot=page-header]:space-y-1 **:data-[slot=page-eyebrow]:text-sm **:data-[slot=page-eyebrow]:font-semibold **:data-[slot=page-eyebrow]:text-primary-foreground/80 dark:[&_[data-slot=page-eyebrow]]:text-primary [&_[data-slot=page-title]]:text-2xl [&_[data-slot=page-title]]:font-bold [&_[data-slot=page-title]]:tracking-tight sm:[&_[data-slot=page-title]]:text-3xl [&_[data-slot=page-description]]:text-sm [&_[data-slot=page-description]]:text-muted-foreground sm:[&_[data-slot=page-description]]:text-base",
        className,
      )}
      {...props}
    />
  );
}
