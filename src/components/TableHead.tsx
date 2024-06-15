import { TableHead as ShadcnTableHead } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface TableHeadProps {
  children?: ReactNode | string;
  className?: string;
}

export const TableHead = ({ children, className }: TableHeadProps) => {
  return (
    <ShadcnTableHead className={cn("font-normal", className)}>
      {children}
    </ShadcnTableHead>
  );
}
