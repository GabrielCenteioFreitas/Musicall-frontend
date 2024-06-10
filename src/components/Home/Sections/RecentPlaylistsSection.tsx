import { LoadingIcon } from "@/components/LoadingIcon";
import { url } from "@/lib/api";
import { cookies } from "next/headers";
import { SectionsContainer } from "../../SectionsContainer";
import { SectionsTitle } from "../../SectionsTitle";
import { PlaylistCard } from "../Cards/PlaylistCard";
import { SectionsItemsContainer } from "../SectionsItemsContainer";
import { PreviewPlaylist } from "@/types/previewPlaylist";
import { getPreviewPlaylists } from "@/lib/getPlaylistsData";

interface RecentPlaylistsSectionProps {
  className?: string;
}

export const RecentPlaylistsSection = async ({ className, ...rest }: RecentPlaylistsSectionProps) => {
  const token = cookies().get('token')?.value
  const previewPlaylists = await getPreviewPlaylists(token || null)
  
  return (
    <SectionsContainer className={className} {...rest}>
      <SectionsTitle
        title="Playlists recentes"
        dividerMargins="my-2"
      />

      {previewPlaylists ? (
        <SectionsItemsContainer>
          {previewPlaylists?.map((playlist: PreviewPlaylist) => 
            <PlaylistCard
              key={playlist.id}
              playlist={playlist}
            />
          )}
        </SectionsItemsContainer>
      ) : (
        <LoadingIcon />
      )}
    </SectionsContainer>
  );
}
