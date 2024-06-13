import { DBSong } from "./song";
import { DBAlbum } from "./album";
import { DBArtist } from "./artist";
import { User } from "./user";

export type FavoriteSong = {
  id: string;
  song: DBSong;
}

export type FavoriteAlbum = {
  id: string;
  album: DBAlbum;
}

export type FavoriteArtist = {
  id: string;
  artist: DBArtist;
}

export interface Favorites {
  favoriteSongs: FavoriteSong[];
  favoriteAlbums: FavoriteAlbum[];
  favoriteArtists: FavoriteArtist[];
}