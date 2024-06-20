'use client'

import { SmallFavoriteArtistButton } from "@/components/FavoriteButtons/SmallFavoriteArtistButton";
import { ITunesURL } from "@/components/ITunesURL";
import { SearchInput } from "@/components/SearchInput";
import { ITunesAlbum } from "@/types/album";
import { ITunesArtist } from "@/types/artist";
import { FavoriteAlbum, FavoriteArtist } from "@/types/favorites";
import { PreviewPlaylist } from "@/types/previewPlaylist";
import { ChangeEvent, useEffect, useState } from "react";
import { AlbumsTable } from "./SongsTable/AlbumsTable";

interface ArtistMainProps {
  artist: Pick<ITunesArtist,
    "artistName" |
    "artistId" |
    "artistLinkUrl"
  >;
  albums: ITunesAlbum[];
  previewPlaylists: PreviewPlaylist[] | null;
  favoriteArtists: FavoriteArtist[] | null;
  favoriteAlbums: FavoriteAlbum[] | null;
}

export const ArtistMain = ({ artist, albums, previewPlaylists, favoriteArtists, favoriteAlbums }: ArtistMainProps) => {
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

  const filteredAlbums = search !== ''
    ? albums.filter(album => album.collectionName.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    : albums

  return (
    <section className="flex flex-col gap-7 w-full">
      <div className="flex justify-between">
        <div className="w-48 flex gap-2 justify-center items-center">
          <SmallFavoriteArtistButton
            artist={artist}
            isFavorited={favoriteArtists?.some(
              favoritedArtist => favoritedArtist.artist.iTunesId === artist.artistId
            ) || false}
            size={24}
            className="hover:text-gray-50 transition-colors"
          />

          <ITunesURL
            url={artist.artistLinkUrl}
          />
        </div>

        <SearchInput search={search} handleSearch={handleSearch} />
      </div>

      <AlbumsTable
        albums={filteredAlbums}
        favoriteAlbums={favoriteAlbums}
        previewPlaylists={previewPlaylists}
      />
    </section>
  );
}
