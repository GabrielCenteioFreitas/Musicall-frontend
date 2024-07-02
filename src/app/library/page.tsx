import { CreatePlaylistCard } from "@/components/Home/Cards/CreatePlaylistCard";
import { SectionsItemsContainer } from "@/components/Home/SectionsItemsContainer";
import { PlaylistCard } from "@/components/PlaylistCard";
import { SectionsTitle } from "@/components/SectionsTitle";
import { getPreviewPlaylists } from "@/lib/getPlaylistsData";
import { cookies } from "next/headers";

const Library = async () => {
  const token = cookies().get('token')?.value
  const previewPlaylists = await getPreviewPlaylists(token || null)

  return (
    <div className="flex flex-col p-5 pb-20">
      <SectionsTitle title="Biblioteca" dividerMargins="my-2" />

      {previewPlaylists?.length === 0 && (
        <div className="-ml-3">
          <CreatePlaylistCard />
        </div>
      )}

      <SectionsItemsContainer>
        {previewPlaylists?.map((previewPlaylist) => 
          <PlaylistCard
            key={previewPlaylist.id}
            playlist={previewPlaylist}
            section="library"
          />
        )}
      </SectionsItemsContainer>
    </div>
  );
}

export default Library;