import { LoadingIcon } from "@/components/LoadingIcon";
import { PlaylistCard } from "@/components/PlaylistCard";
import { getPreviewPlaylists } from "@/lib/getPlaylistsData";
import { PreviewPlaylist } from "@/types/previewPlaylist";
import { cookies } from "next/headers";
import { SectionsContainer } from "../../SectionsContainer";
import { SectionsTitle } from "../../SectionsTitle";
import { SectionsItemsContainer } from "../SectionsItemsContainer";

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
