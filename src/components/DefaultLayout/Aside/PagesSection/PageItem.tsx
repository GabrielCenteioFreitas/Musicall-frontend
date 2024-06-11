import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";
import Link from "next/link";
import { ReactNode, memo } from "react";
import { loginURL } from "../../Header/SignIn";

interface PageItemProps {
  name: string;
  href: string;
  active?: boolean;
  className?: string;
  children: ReactNode;
}

const PageItemComponent = ({ name, href, active=false, className, children }: PageItemProps) => {
  const token = Cookies.get('token')

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
        <Link href={token ? href : loginURL}>
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
