import { SongCard } from "@/components/SongCard";
import { getSongsByGenre } from "@/lib/getSongsByGenre";
import { cn } from "@/lib/utils";
import { FavoriteSong } from "@/types/favorites";
import { SectionsContainer } from "../../SectionsContainer";
import { SectionsItemsContainer } from "../SectionsItemsContainer";

interface SongsSectionProps {
  genre: string;
  sectionTitle: string;
  limit: number;
  favoriteSongs: FavoriteSong[] | undefined;
  className?: string;
}

export const SongsSection = async ({ 
  genre,
  sectionTitle,
  limit,
  favoriteSongs,
  className
}: SongsSectionProps) => {
  const songs = await getSongsByGenre({
    genre,
    limit,
  })

  if (songs.length === 0) {
    return null
  }

  const convertedSongs = songs.map(song => ({ song }))

  return (
    <SectionsContainer className={cn("mb-4", className)}>
      <h2 className="text-xl font-semibold">
        {sectionTitle}
      </h2>

      <SectionsItemsContainer className="grid-cols-8">
        {convertedSongs.map((song) => {
          return (
            <SongCard
              key={song.song.id}
              song={song}
              songsGroup={convertedSongs}
              isFavorited={favoriteSongs?.some(
                favoritedSong => favoritedSong.song.iTunesId === song.song.iTunesId
              ) || false}
            />
          )
        })}
      </SectionsItemsContainer>
    </SectionsContainer>
  );
}
