'use client'

import { SearchInput } from "@/components/SearchInput";
import { ITunesAlbum } from "@/types/album";
import { FavoriteAlbum, FavoriteSong } from "@/types/favorites";
import { PreviewPlaylist } from "@/types/previewPlaylist";
import { ITunesSong } from "@/types/song";
import { ChangeEvent, useEffect, useState } from "react";
import { PlayButton } from "@/components/PlayButtons/AlbumPlayButton";
import { SongsTable } from "./SongsTable/SongsTable";
import { SmallFavoriteAlbumButton } from "@/components/FavoriteButtons/SmallFavoriteAlbumButton";
import { AddToPlaylist } from "./AddToPlaylist";
import { ITunesURL } from "@/components/ITunesURL";

interface AlbumMainProps {
  album: Pick<ITunesAlbum,
    "collectionName" | 
    "artworkUrl100" | 
    "artistName" | 
    "releaseDate" |
    "collectionId" | 
    "collectionViewUrl"
  >;
  songs: ITunesSong[];
  previewPlaylists: PreviewPlaylist[] | null;
  favoriteSongs: FavoriteSong[] | null;
  favoriteAlbums: FavoriteAlbum[] | null;
  predominantColor: string;
}

export const AlbumMain = ({
  album,
  songs,
  previewPlaylists,
  favoriteSongs,
  favoriteAlbums,
  predominantColor,
}: AlbumMainProps) => {
  const [search, setSearch] = useState('')
  
  useEffect(() => {
    const url = new URL(window.location.toString());
    const searchParam = url.searchParams.get('search') ?? '';
    setSearch(searchParam);
  }, []);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value

    const url = new URL(window.location.toString())
    if (search !== '') {
      url.searchParams.set('search', search)
    } else {
      url.searchParams.delete('search');
    }
    window.history.pushState({}, "", url)

    setSearch(search)
  }

  const filteredSongs = search !== ''
    ? songs.filter(song => song.trackName.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    : songs

  return (
    <div className="flex flex-col gap-7 w-3/4">
      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <PlayButton albumSongs={filteredSongs} />

          <div className="flex gap-2">
            <AddToPlaylist
              songs={songs}
              previewPlaylists={previewPlaylists}
              size={24}
            />

            <SmallFavoriteAlbumButton
              album={album}
              isFavorited={favoriteAlbums?.some(
                favoritedAlbum => favoritedAlbum.album.iTunesId === album.collectionId
              ) || false}
              size={24}
              className="hover:text-gray-50 transition-colors"
            />

            <ITunesURL
              url={album.collectionViewUrl}
            />
          </div>
        </div>

        <SearchInput search={search} handleSearch={handleSearch} />
      </div>

      <SongsTable
        songs={filteredSongs}
        favoriteSongs={favoriteSongs}
        previewPlaylists={previewPlaylists}
        predominantColor={predominantColor}
      />
    </div>
  );
}
