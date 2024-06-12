import { DBSong } from "./song";
import { DBAlbum } from "./album";
import { User } from "./user";

export type FavoriteSong = {
  id: string;
  song: DBSong;
}

export type FavoriteAlbum = {
  id: string;
  album: DBAlbum;
}

export interface Favorites {
  favoriteSongs: FavoriteSong[];
  favoriteAlbums: FavoriteAlbum[];
}