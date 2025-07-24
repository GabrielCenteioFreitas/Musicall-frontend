import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode, memo } from "react";

interface PageItemProps {
  name: string;
  href: string;
  active?: boolean;
  className?: string;
  children: ReactNode;
}

const PageItemComponent = ({ name, href, active=false, className, children }: PageItemProps) => {
  return (
    <li className="w-full">
      <Button
        variant="outline"
        className={cn(
          'w-full flex justify-start items-center gap-2.5 rounded-xl',
          active ? '!bg-zinc-800 hover:!bg-zinc-800' : 'bg-zinc-950 hover:!bg-zinc-900',
          className
        )}
        title={name}
        asChild
      >
        <Link
          prefetch={false}
          href={href}
          aria-label={`Acessar página "${name}"`}
        >
          {children}
          {name}
        </Link>
      </Button>
    </li>
  );
}

export const PageItem = memo(PageItemComponent, (prevProps, nextProps) => {
  return prevProps.active === nextProps.active
})
