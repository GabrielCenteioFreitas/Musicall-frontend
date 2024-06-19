import { cn } from "@/lib/utils";
import { ElementType } from "react";

interface PlayerButtonIconProps {
  icon: ElementType;
  className?: string;
  size?: number;
}

export const PlayerButtonIcon = ({ icon: Icon, className, size=24 }: PlayerButtonIconProps) => {
  return (
    <Icon
      size={size}
      className={cn("text-zinc-400 hover:text-zinc-50 transition-colors", className)}
    />
  );
}
