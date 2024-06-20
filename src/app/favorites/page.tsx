import { loginURL } from "@/components/DefaultLayout/Header/SignIn";
import { AlbumsSection } from "@/components/Favorites/AlbumsSection";
import { ArtistsSection } from "@/components/Favorites/ArtistsSection";
import { SongsSection } from "@/components/Favorites/SongsSection";
import { getFavorites } from "@/lib/getFavoritesData";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Loading from "./loading";

const FavoritesPage = async () => {
  const token = cookies().get('token')?.value

  if (!token) {
    return redirect(loginURL)
  }

  const favorites = await getFavorites(token)

  return (
    <div className="space-y-5 p-5 pb-20">
      <SongsSection favoriteSongs={favorites?.favoriteSongs} />

      <AlbumsSection favoriteAlbums={favorites?.favoriteAlbums} />

      <ArtistsSection favoriteArtists={favorites?.favoriteArtists} />
    </div>
  );
}

export default FavoritesPage;