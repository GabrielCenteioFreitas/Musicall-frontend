'use client'

import { AddToPlaylist } from "@/components/AddToPlaylist";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { getUserFromServer } from "@/lib/getUserFromServer";
import { PlaylistSong } from "@/types/playlistSong";
import { PreviewPlaylist } from "@/types/previewPlaylist";
import dayjs from 'dayjs';
import ptBr from 'dayjs/locale/pt-br';
import Image from "next/image";
import Link from "next/link";
import { LuClock } from "react-icons/lu";
import { VscHeart } from "react-icons/vsc";
import Cookies from "js-cookie";
import { RemoveFromPlaylist } from "./RemoveFromPlaylist";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { getUserFromClient } from "@/lib/getUserFromClient";

dayjs.locale(ptBr)

interface SongsTableProps {
  playlist: {
    name: string;
    id: string;
    userId: string;
  }
  songs: PlaylistSong[];
  previewPlaylists: PreviewPlaylist[] | null;
  isUserTheCreator: boolean;
}

export const SongsTable = ({ playlist, songs, previewPlaylists, isUserTheCreator }: SongsTableProps) => {
  if (!songs?.length) {
    return <span>Sua playlist não possui nenhuma música.</span>
  }

  return (
    <Table className="w-full table-fixed">
      <TableHeader className="text-md text-zinc-200/40">
        <TableRow className="border-b border-b-zinc-200/40 text-left">
          <TableHead className="pl-3 w-9 font-normal">#</TableHead>
          <TableHead className="w-1/2 font-normal">Título</TableHead>
          <TableHead className="w-1/2 font-normal">Álbum</TableHead>
          <TableHead className="font-normal w-16">
            <LuClock size={20} />
          </TableHead>
          <TableHead className="font-normal w-44">Adicionada em</TableHead>
          <TableHead className="font-normal w-28"></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {songs.map((curSong, i) => {
          const minutes = Math.floor(curSong.song.durationInSeconds / 60)
          const seconds = Math.ceil(curSong.song.durationInSeconds - (minutes * 60))

          return (
            <TableRow key={`${curSong.id}`} className="hover:bg-zinc-700/20 transition-all">
              <TableCell className="text-sm text-zinc-400 pl-3">
                {i+1}
              </TableCell>

              <TableCell className="py-2">
                <Link href="#" className="flex items-center gap-2">
                  <Image
                    src={curSong.song.portrait}
                    alt={curSong.song.name}
                    width={48}
                    height={48}
                    className="rounded-lg h-full aspect-square"
                  />

                  <div className="flex flex-col justify-center text-left max-w-[360px]">
                    <span className="text-md font-medium truncate ...">
                      {curSong.song.name}
                    </span>
                    <span className="text-xs text-zinc-400 line-clamp-2 text-wrap truncate ...">
                      {curSong.song.artist.name}
                    </span>
                  </div>
                </Link>
              </TableCell>

              <TableCell className="text-sm text-zinc-400 truncate ...">
                {curSong.song.album.name}
              </TableCell>

              <TableCell className="text-sm text-zinc-400">
              {minutes}:{seconds.toString().padStart(2, '0')}
              </TableCell>

              <TableCell className="text-sm text-zinc-400">
                {dayjs(curSong.addedAt).format("D[ de ]MMM[. de ]YYYY")}
              </TableCell>

              <TableCell className="pr-3">
                <div className="flex gap-1.5">
                  <AddToPlaylist
                    previewPlaylists={previewPlaylists}
                    song={{
                      trackId: curSong.song.iTunesId,
                      artistId: curSong.song.artist.iTunesId,
                      collectionId: curSong.song.album.iTunesId,
                    }}
                    className="text-zinc-400"
                  />
                  <VscHeart
                    size={20}
                    className="text-zinc-400 hover:scale-110 transition-all cursor-pointer"
                  />
                  {isUserTheCreator && (
                    <RemoveFromPlaylist
                      playlist={playlist}
                      songId={curSong.id}
                    />
                  )}
                </div>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  );
}
