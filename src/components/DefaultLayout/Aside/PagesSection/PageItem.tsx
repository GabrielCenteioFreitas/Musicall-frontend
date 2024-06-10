import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PageItemProps {
  name: string;
  href: string;
  active?: boolean;
  className?: string;
  children: ReactNode;
}

export const PageItem = ({ name, href, active=false, className, children }: PageItemProps) => {
  return (
    <li className="w-full">
      <Button
        variant="outline"
        className={cn(
          'w-full flex justify-start items-center gap-2.5 rounded-xl',
          active ? '!bg-zinc-800 hover:!bg-zinc-800' : 'bg-zinc-950 hover:!bg-zinc-900',
          className
        )}
        asChild
      >
        <Link href={href}>
          {children}
          {name}
        </Link>
      </Button>
    </li>
  );
}