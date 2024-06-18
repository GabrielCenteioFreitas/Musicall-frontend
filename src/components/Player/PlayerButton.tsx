import { ElementType } from "react";
import { Button } from "../ui/button";

interface PlayerButtonProps {
  icon: ElementType;
  title: string;
  onClick: () => void;
}

export const PlayerButton = ({ icon: Icon, title, onClick }: PlayerButtonProps) => {
  return (
    <Button
      variant="none"
      size="none"
      title={title}
      onClick={onClick}
    >
      <Icon className="size-6 text-zinc-400 hover:text-zinc-50 transition-colors" />
    </Button>
  );
}
