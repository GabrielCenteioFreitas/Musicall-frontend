import { FavoriteSongButton } from "@/components/FavoriteButtons/FavoriteSongButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlayingSong } from "@/types/song";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { SongCardPlayButton } from "./PlayButtons/SongCardPlayButton";

interface SongCardProps {
  song: PlayingSong;
  songsGroup: PlayingSong[];
  isFavorited?: boolean;
  className?: string;
}

const SongCardComponent = ({ song, songsGroup, isFavorited, className }: SongCardProps) => {
  return (
    <div className="group relative">
      <Button
        variant="ghost"
        className={cn("h-fit p-3 flex flex-col gap-3 shrink-0 rounded-md transition-colors", className)}
        asChild
      >
        <div>
          <Image
            className="w-full aspect-square object-cover rounded-md"
            src={song.song.portrait}
            alt={song.song.name}
            width={100}
            height={100}
          />

          <div className="flex flex-col gap-1 self-start text-left max-w-full">
            <span className="text-lg font-medium leading-tight truncate ..." title={song.song.name}>
              {song.song.name}
            </span>
            <Link
              href={`/artists/${song.song.artist.iTunesId}`}
              title={song.song.artist.name}
              className="text-xs text-zinc-400 hover:underline leading-tight truncate ..."
            >
              {song.song.artist.name}
            </Link>
          </div>
        </div>
      </Button>

      {isFavorited !== undefined && (
        <FavoriteSongButton
          isFavorited={isFavorited}
          song={{
            artistId: song.song.artist.iTunesId,
            collectionId: song.song.album.iTunesId,
            trackId: song.song.iTunesId
          }}
          className={cn("absolute left-4 bg-zinc-950 text-gray-50 transition-all duration-200",
            isFavorited ? "top-4" : "top-0 group-hover:top-4 opacity-0 group-hover:opacity-100"
          )}
        />
      )}

      <SongCardPlayButton
        song={song}
        songsGroup={songsGroup}
        songIndex={songsGroup.indexOf(song)}
      />
    </div>
  );
}

export const SongCard = memo(SongCardComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.song, nextProps.song)
})
