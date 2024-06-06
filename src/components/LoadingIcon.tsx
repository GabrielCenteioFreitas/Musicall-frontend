import { cn } from "@/lib/utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface LoadingIconProps {
  className?: string;
  size?: number;
}

export const LoadingIcon = ({ className, size=32 }: LoadingIconProps) => {
  return (
    <AiOutlineLoading3Quarters
      className={cn("animate-spin", className)}
      size={size}
    />
  );
}
