import { PlaylistCard } from "@/components/Home/Cards/PlaylistCard";
import { SectionsTitle } from "@/components/SectionsTitle";
import { getPreviewPlaylists } from "@/lib/getPlaylistsData";
import { cookies } from "next/headers";

const Library = async () => {
  const token = cookies().get('token')?.value
  const previewPlaylists = await getPreviewPlaylists(token || null)

  return (
    <div className="flex flex-col p-5 pb-20">
      <SectionsTitle title="Biblioteca" dividerMargins="my-2" />

      {previewPlaylists && previewPlaylists.length > 0 ? (
        <div className="grid grid-cols-7 -ml-3">
          {previewPlaylists?.map((previewPlaylist) => 
            <PlaylistCard key={previewPlaylist.id} playlist={previewPlaylist} />
          )}
        </div>
      ) : (
        <p>Você não possui nenhuma playlist.</p>
      )}
    </div>
  );
}

export default Library;