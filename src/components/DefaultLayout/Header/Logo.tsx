import { cn } from "@/lib/utils";
import Link from "next/link";
import { ImHeadphones } from "react-icons/im";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className, ...rest }: LogoProps) => {
  return (
      <Link
        prefetch={false}
        href="/"
        className={cn("w-60 flex items-center gap-2", className)}
        aria-label="Acessar página principal"
        {...rest}
      >
        <ImHeadphones size={28} />
        
        <h1 className="text-4xl font-semibold" title="Musicall">
          Musicall
        </h1>
      </Link>
  );
}
