import { cn } from "@/lib/utils";
import { ImHeadphones } from "react-icons/im";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className, ...rest }: LogoProps) => {
  return (
    <div className={cn("w-60 flex items-center gap-2", className)} {...rest}>
      <ImHeadphones size={28} />
      
      <h1 className="text-4xl font-semibold">
        Musicall
      </h1>
    </div>
  );
}
