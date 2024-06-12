import { DBSong } from './song'

export type PlaylistSong = {
  id: string;
  addedAt: Date;
  song: DBSong;
}