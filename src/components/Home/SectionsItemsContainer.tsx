import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionsItemsContainerProps {
  children: ReactNode;
  className?: string;
}

export const SectionsItemsContainer = ({ children, className, ...rest }: SectionsItemsContainerProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-7 -ml-3",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
