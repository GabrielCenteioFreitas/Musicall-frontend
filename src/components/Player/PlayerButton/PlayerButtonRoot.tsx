import { ReactNode } from "react";
import { Button } from "../../ui/button";

interface PlayerButtonRootProps {
  title: string;
  onClick: () => void;
  className?: string;
  children: ReactNode;
}

export const PlayerButtonRoot = ({ title, onClick, className, children }: PlayerButtonRootProps) => {
  return (
    <Button
      onClick={onClick}
      title={title}
      variant="none"
      size="none"
      className={className}
      aria-label={title}
    >
      {children}
    </Button>
  );
}
