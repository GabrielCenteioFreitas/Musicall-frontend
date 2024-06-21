'use client'

import { SongCard } from "@/components/SongCard";
import { Favorites } from "@/types/favorites";
import { PlayingSong } from "@/types/song";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { SectionsContainer } from "../../SectionsContainer";
import { SectionsTitle } from "../../SectionsTitle";
import { SectionsItemsContainer } from "../SectionsItemsContainer";

interface RecentSongsSectionProps {
  favorites: Favorites;
  className?: string;
}

export const RecentSongsSection = ({ favorites, className, ...rest }: RecentSongsSectionProps) => {
  const token = Cookies.get('token');
  const [recentSongs, setRecentSongs] = useState<PlayingSong[]>([]);

  useEffect(() => {
    const storedRecentSongs = localStorage.getItem('recentSongs');
    if (storedRecentSongs) {
      setRecentSongs(JSON.parse(storedRecentSongs));
    }
  }, []);

  if (!token || recentSongs.length === 0) {
    return null;
  }

  return (
    <SectionsContainer className={className} {...rest}>
      <SectionsTitle
        title="Músicas recentes"
        dividerMargins="my-2"
      />

      <SectionsItemsContainer className="grid-cols-8">
        {recentSongs.slice(0, 8).map((recentSong, i) => 
          <SongCard
            key={recentSong.song.iTunesId}
            song={recentSongs[i]}
            songsGroup={recentSongs.slice(0, 8)}
            isFavorited={favorites.favoriteSongs?.some(
              favoritedSong => favoritedSong.song.iTunesId === recentSong.song.iTunesId
            ) || false}
          />
        )}
      </SectionsItemsContainer>
    </SectionsContainer>
  );
}
