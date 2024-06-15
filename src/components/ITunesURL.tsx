import { cn } from "@/lib/utils";
import { FiExternalLink } from "react-icons/fi";

interface ITunesURLProps {
  url: string;
  className?: string;
  size?: number;
}

export const ITunesURL = ({ url, className, size=24 }: ITunesURLProps) => {
  return (
    <a
      href={url}
      target="_blank"
      className={cn("text-gray-400 hover:text-gray-50 transition-colors", className)}
    >
      <FiExternalLink size={size} />
    </a>
  );
}
