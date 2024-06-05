import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Aside } from "./Aside/Aside";
import { Header } from "./Header/Header";

interface DefaultLayoutProps {
  className?: string;
  children?: ReactNode;
}

export const DefaultLayout = ({ className, children }: DefaultLayoutProps) => {
  return (
    <div className="h-full flex flex-col gap-4 px-16 pt-4 overflow-y-clip no-scrollbar">
      <Header />
      
      <div className="h-full flex gap-4">
        <Aside />

        <main
          className={cn(`
            flex-1 overflow-y-scroll no-scrollbar 
            border border-b-0 border-neutral-800 rounded-t-xl`,
            className
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
