import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  className?: string;
  children: React.ReactNode;
}

export function Section({ id, className, children, ...props }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "container mx-auto px-4 py-16 sm:px-6 lg:px-8",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
