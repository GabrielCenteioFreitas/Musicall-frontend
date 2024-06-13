import { loginURL } from "@/components/DefaultLayout/Header/SignIn";
import { Divider } from "@/components/Divider";
import { getFavorites } from "@/lib/getFavoritesData";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const FavoritesPage = async () => {
  const token = cookies().get('token')?.value

  if (!token) {
    return redirect(loginURL)
  }

  const favorites = await getFavorites(token)

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold">Songs</h1>
      {favorites?.favoriteSongs.map((favoritedSong) =>
        <span key={favoritedSong.song.iTunesId}>
          {favoritedSong.song.artist.name} - {favoritedSong.song.name}
        </span>
      )}

      <Divider className="my-4" />

      <h1 className="text-2xl font-semibold">Álbuns</h1>
      {favorites?.favoriteAlbums.map((favoritedAlbum) =>
        <span key={favoritedAlbum.album.iTunesId}>
          {favoritedAlbum.album.artist.name} - {favoritedAlbum.album.name}
        </span>
      )}

      <Divider className="my-4" />

      <h1 className="text-2xl font-semibold">Artistas</h1>
      {favorites?.favoriteArtists.map((favoritedArtist) =>
        <span key={favoritedArtist.artist.iTunesId}>
          {favoritedArtist.artist.name}
        </span>
      )}

      <Divider className="my-4" />
    </div>
  );
}

export default FavoritesPage;