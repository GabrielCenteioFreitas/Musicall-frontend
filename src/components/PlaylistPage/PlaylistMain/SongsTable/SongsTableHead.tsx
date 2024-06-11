import { TableHead } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SongsTableHeadProps {
  children?: ReactNode | string;
  className?: string;
}

export const SongsTableHead = ({ children, className }: SongsTableHeadProps) => {
  return (
    <TableHead className={cn("font-normal", className)}>
      {children}
    </TableHead>
  );
}
