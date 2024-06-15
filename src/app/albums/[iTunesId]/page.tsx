import { AlbumInfo } from "@/components/AlbumPage/AlbumInfo/AlbumInfo";
import { AlbumMain } from "@/components/AlbumPage/AlbumMain/AlbumMain";
import { getFavorites } from "@/lib/getFavoritesData";
import { getDataFromLookup } from "@/lib/getITunesData";
import { getPreviewPlaylists } from "@/lib/getPlaylistsData";
import { getPredominantColor } from "@/lib/getPredominantColor";
import { ITunesAlbum } from "@/types/album";
import { ITunesSong } from "@/types/song";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const AlbumPage = async ({ params }: { params: { iTunesId: number } }) => {
  const { iTunesId } = params
  const { results, resultCount } = await getDataFromLookup({
    id: iTunesId,
    entity: 'song'
  })
  const albumData: ITunesAlbum = results[0]
  if (!albumData) {
    return redirect('/')
  }
  const songData: ITunesSong[] = results.slice(1, resultCount)
  const predominantColor = await getPredominantColor(albumData.artworkUrl100)
  
  const token = cookies().get('token')?.value
  const previewPlaylists = await getPreviewPlaylists(token || null)
  const favorites = await getFavorites(token || null)

  return (
    <div className="p-5 pb-20 relative min-h-full">
      <div
        className="absolute inset-0 -z-50"
        style={{ background: `radial-gradient(circle at top right, ${predominantColor}15 50%, transparent 75%) fixed` }}
      />

      <div className="flex flex-col gap-4">
        <AlbumInfo
          album={albumData}
          songs={songData}
        />

        <AlbumMain
          album={albumData}
          songs={songData}
          previewPlaylists={previewPlaylists}
          favoriteSongs={favorites?.favoriteSongs || null}
          favoriteAlbums={favorites?.favoriteAlbums || null}
        />
      </div>
    </div>
  );
}

export default AlbumPage;