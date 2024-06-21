import { cn } from "@/lib/utils";
import { FiExternalLink } from "react-icons/fi";

interface ITunesURLProps {
  url: string;
  ariaLabel?: string;
  className?: string;
  size?: number;
}

export const ITunesURL = ({ url, ariaLabel, className, size=24 }: ITunesURLProps) => {
  return (
    <a
      href={url}
      target="_blank"
      className={cn("text-gray-400 hover:text-gray-50 transition-colors", className)}
      aria-label={ariaLabel}
    >
      <FiExternalLink size={size} />
    </a>
  );
}
