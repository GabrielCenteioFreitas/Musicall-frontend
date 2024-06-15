import { FavoriteAlbum, FavoriteArtist, FavoriteSong } from "@/types/favorites";
import { PreviewPlaylist } from "@/types/previewPlaylist";
import { PublicPlaylistsSection } from "./PublicPlaylistsSection";
import { FavoriteSongsSection } from "./FavoriteSongsSection";
import { FavoriteAlbumsSection } from "./FavoriteAlbumsSection";
import { FavoriteArtistsSection } from "./FavoriteArtistsSection";

interface UserSectionsProps {
  playlists: PreviewPlaylist[];
  favoriteSongs: FavoriteSong[];
  favoriteAlbums: FavoriteAlbum[];
  favoriteArtists: FavoriteArtist[];
}

export const UserSections = ({
  playlists,
  favoriteSongs,
  favoriteAlbums,
  favoriteArtists
}: UserSectionsProps) => {
  return (
    <div className="flex flex-col gap-4">
      <PublicPlaylistsSection playlists={playlists} />

      <FavoriteSongsSection favoriteSongs={favoriteSongs} />

      <FavoriteAlbumsSection favoriteAlbums={favoriteAlbums} />

      <FavoriteArtistsSection favoriteArtists={favoriteArtists} />
    </div>
  );
}
