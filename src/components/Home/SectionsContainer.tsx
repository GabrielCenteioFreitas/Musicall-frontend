import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionsContainerProps {
  children: ReactNode;
  className?: string;
}

export const SectionsContainer = ({ children, className, ...rest }: SectionsContainerProps) => {
  return (
    <div className={cn("mb-2", className)} {...rest}>
      {children}
    </div>
  );
}
