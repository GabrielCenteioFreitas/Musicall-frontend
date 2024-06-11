import Play from "@/assets/play.svg";
import { Button } from "@/components/ui/button";
import { Playlist } from "@/types/playlist";
import Image from "next/image";

interface PlayButtonProps {
  playlist: Playlist;
}

export const PlayButton = ({ playlist }: PlayButtonProps) => {
  return (
    <Button
      variant="secondary"
      size="icon"
      className="rounded-full !p-4 transition-colors"
      title="Ouvir playlist"
    >
      <Image
        src={Play}
        alt="Botão de play"
        className="size-3"
      />
    </Button>
  );
}
