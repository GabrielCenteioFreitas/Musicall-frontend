import { loginURL } from "@/components/DefaultLayout/Header/SignIn";
import { MoreSongs } from "@/components/PlaylistPage/MoreSongs/MoreSongs";
import { PlaylistAside } from "@/components/PlaylistPage/PlaylistAside/PlaylistAside";
import { PlaylistInfo } from "@/components/PlaylistPage/PlaylistInfo/PlaylistInfo";
import { PlaylistMain } from "@/components/PlaylistPage/PlaylistMain/PlaylistMain";
import { getFavorites } from "@/lib/getFavoritesData";
import { getPlaylist, getPreviewPlaylists } from "@/lib/getPlaylistsData";
import { getPredominantColor } from "@/lib/getPredominantColor";
import { getUserFromServer } from "@/lib/getUserFromServer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const PlaylistPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const token = cookies().get('token')?.value
  const playlist = await getPlaylist(id, token || null)
  
  if (!playlist?.id) {
    if (!token) {
      redirect(loginURL)
    }
    redirect('/')
  }

  const previewPlaylists = await getPreviewPlaylists(token || null)
  const favorites = await getFavorites(token || null)
  const user = await getUserFromServer()
  const isUserTheCreator = !!user && user.sub ===  playlist.userId

  let predominantColor: string | undefined = '';
  if (playlist.portrait) {
    predominantColor = await getPredominantColor(playlist.portrait)
  }

  return (
    <div className="flex gap-5 p-5 pb-20 relative min-h-full">
      {playlist.portrait && (
        <div
          className="absolute inset-0 -z-50"
          style={{ background: `radial-gradient(circle at top right, ${predominantColor}15 50%, transparent 75%) fixed` }}
        />
      )}

      <div className="flex-1">
        <div className="flex flex-col gap-4">
          <PlaylistInfo playlist={playlist} />

          <PlaylistMain
            playlist={playlist}
            previewPlaylists={previewPlaylists}
            favoriteSongs={favorites?.favoriteSongs || null}
            isUserTheCreator={isUserTheCreator}
          />

          {isUserTheCreator && (
            <MoreSongs />
          )}
        </div>
      </div>

      <PlaylistAside isUserTheCreator={isUserTheCreator} playlist={playlist} />
    </div>
  );
}

export default PlaylistPage;