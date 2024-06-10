import { LoadingIcon } from "@/components/LoadingIcon";
import { getPreviewPlaylists } from "@/lib/getPlaylistsData";
import { PreviewPlaylist } from "@/types/previewPlaylist";
import { cookies } from "next/headers";
import { CreatePlaylistItem } from "./CreatePlaylistItem";
import { PlaylistItem } from "./PlaylistItem";

export const PlaylistsSection = async () => {
  const token = cookies().get('token')?.value
  const previewPlaylists = await getPreviewPlaylists(token || null)

  if (!previewPlaylists && token) {
    return (
      <div className="w-full flex justify-center">
        <LoadingIcon />
      </div>
    )
  }

  return (
    <ul className="-ml-2 -mt-2 mb-16 text-xs flex flex-col font-medium overflow-y-scroll no-scrollbar">
      <CreatePlaylistItem />

      {token && previewPlaylists?.map((playlist: PreviewPlaylist) => (
        <PlaylistItem
          key={playlist.id}
          playlist={playlist}
        />
      ))}
    </ul>
  );
};
