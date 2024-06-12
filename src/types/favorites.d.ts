import { DBSong } from "./song";
import { User } from "./user";

export type FavoriteSong = {
  id: string;
  song: DBSong;
}

export interface Favorites {
  favoriteSongs: FavoriteSong[];
}