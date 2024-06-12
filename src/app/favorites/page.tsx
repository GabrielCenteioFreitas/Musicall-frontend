import { loginURL } from "@/components/DefaultLayout/Header/SignIn";
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
    </div>
  );
}

export default FavoritesPage;