import { PlaylistSong } from "./playlistSong";

export type Playlist = {
  id: string;
  userId: string;
  name: string;
  portrait: string;
  isPublic: boolean;
  createdAt: Date;
  user: {
    name: string;
    id: string;
    avatarUrl: string;
  };
  songs: PlaylistSong[]
}