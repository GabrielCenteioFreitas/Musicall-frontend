import { SongCard } from "@/components/SongCard";
import { getSongsByGenre } from "@/lib/getSongsByGenre";
import { SectionsContainer } from "../../SectionsContainer";
import { SectionsTitle } from "../../SectionsTitle";
import { SectionsItemsContainer } from "../SectionsItemsContainer";
import { FavoriteSong } from "@/types/favorites";
import { cn } from "@/lib/utils";

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

  return (
    <SectionsContainer className={cn("mb-4", className)}>
      <h2 className="text-xl font-semibold">
        {sectionTitle}
      </h2>

      <SectionsItemsContainer className="grid-cols-8">
        {songs.map((song) => 
          <SongCard
            key={song.id}
            song={{
              trackName: song.name,
              trackId: song.iTunesId,
              artworkUrl100: song.portrait,
              artistName: song.artist.name,
              artistId: song.artist.iTunesId,
              collectionId: song.album.iTunesId,
            }}
            isFavorited={favoriteSongs?.some(
              favoritedSong => favoritedSong.song.iTunesId === song.iTunesId
            ) || false}
          />
        )}
      </SectionsItemsContainer>
    </SectionsContainer>
  );
}
