import { FavoriteAlbum, FavoriteArtist, FavoriteSong } from "./favorites";
import { PreviewPlaylist } from "./previewPlaylist";

export type User = {
  sub: string;
  name: string;
  avatarUrl: string;
}

export type DBUser = {
  name: string;
  avatarUrl: string;
  id: string;
  createdAt: Date;
  playlists: PreviewPlaylist[];
  favoriteSongs: FavoriteSong[];
  favoriteAlbums: FavoriteAlbum[];
  favoriteArtists: FavoriteArtist[];
}