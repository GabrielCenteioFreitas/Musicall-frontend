import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Button } from "../../ui/button";

interface AsideItemProps {
  name: string;
  active?: boolean;
  className?: string;
  children: ReactNode;
}

export const AsideItem = ({ name, active=false, className, children }: AsideItemProps) => {
  return (
    <li className="w-full">
      <Button
        variant="outline"
        className={cn(
          'w-full flex justify-start items-center gap-2.5 rounded-xl',
          active ? '!bg-zinc-800 hover:!bg-zinc-800' : 'bg-zinc-950 hover:!bg-zinc-900',
          className
        )}
      >
        {children}
        {name}
      </Button>
    </li>
  );
}
