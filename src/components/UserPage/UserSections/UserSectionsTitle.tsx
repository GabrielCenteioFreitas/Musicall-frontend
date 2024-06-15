import { Divider } from "@/components/Divider";
import { cn } from "@/lib/utils";

interface UserSectionsTitleProps {
  title: string;
  className?: string;
}

export const UserSectionsTitle = ({ title, className }: UserSectionsTitleProps) => {
  return (
    <div>
      <h3 className={cn("font-semibold text-2xl", className)}>
        {title}
      </h3>

      <Divider className="my-2" />
    </div>
  );
}
