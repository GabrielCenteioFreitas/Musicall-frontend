'use client'

import { Playlist } from "@/types/playlist";
import { PreviewPlaylist } from "@/types/previewPlaylist";
import { ChangeEvent, useEffect, useState } from "react";
import { PlayButton } from "./PlayButton";
import { SearchInput } from "./SearchInput";
import { SongsTable } from "./SongsTable";
import { EditPlaylistInfo } from "./EditPlaylistInfo";
import { getUserFromClient } from "@/lib/getUserFromClient";

interface PlaylistMainProps {
  playlist: Playlist;
  previewPlaylists: PreviewPlaylist[] | null;
}

export const PlaylistMain = ({ playlist, previewPlaylists }: PlaylistMainProps) => {
  const [search, setSearch] = useState('')
  const user = getUserFromClient()
  const [isClient, setIsClient] = useState(false)
  const isUserTheCreator = !!user && user.sub ===  playlist.userId && isClient

  useEffect(() => {
    setIsClient(true)
  }, [])

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
    ? playlist.songs.filter(song => song.song.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    : playlist.songs

  return (
    <div className="flex flex-col gap-7">
      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <PlayButton playlist={playlist} />

          {isUserTheCreator && (
            <EditPlaylistInfo playlist={playlist} />
          )}
        </div>

        <SearchInput search={search} handleSearch={handleSearch} />
      </div>

      <SongsTable
        playlist={playlist}
        songs={filteredSongs}
        previewPlaylists={previewPlaylists}
        isUserTheCreator={isUserTheCreator}
      />
    </div>
  );
}
