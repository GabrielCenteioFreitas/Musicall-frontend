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
      variant="none"
      size="none"
      title={title}
      onClick={onClick}
      className={className}
    >
      {children}
    </Button>
  );
}
