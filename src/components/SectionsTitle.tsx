import { cn } from "@/lib/utils";
import { Divider } from "./Divider";

interface SectionsTitleProps {
  title: string;
  dividerMargins: string;
  className?: string;
}

export const SectionsTitle = ({ title, dividerMargins, className }: SectionsTitleProps) => {
  return (
    <>
      <h2 className={cn("text-2xl font-semibold", className)}>
        {title}
      </h2>

      <Divider className={dividerMargins} />
    </>
  );
}
