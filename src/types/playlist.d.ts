import { PlaylistSong } from "./song";

export type Playlist = {
  id: string;
  userId: string;
  name: string;
  description: string | null;
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