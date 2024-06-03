import { cn } from "@/lib/utils";

interface DividerProps {
  className?: string;
}

export const Divider = ({ className }: DividerProps) => {
  return (
    <div
      className={cn("h-0.5 w-full bg-zinc-800", className)}
    />
  );
}
