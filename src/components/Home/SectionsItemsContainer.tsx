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
        "-ml-3 flex items-center overflow-x-scroll no-scrollbar",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
