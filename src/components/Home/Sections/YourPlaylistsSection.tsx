import { LoadingIcon } from "@/components/LoadingIcon";
import { getPreviewPlaylists } from "@/lib/getPlaylistsData";
import { PreviewPlaylist } from "@/types/previewPlaylist";
import { cookies } from "next/headers";
import { SectionsContainer } from "../../SectionsContainer";
import { SectionsTitle } from "../../SectionsTitle";
import { PlaylistCard } from "@/components/PlaylistCard";
import { CreatePlaylistCard } from "../Cards/CreatePlaylistCard";
import { SectionsItemsContainer } from "../SectionsItemsContainer";

interface YourPlaylistsSectionProps {
  className?: string;
}

export const YourPlaylistsSection = async ({ className, ...rest }: YourPlaylistsSectionProps) => {
  const token = cookies().get('token')?.value
  const previewPlaylists = await getPreviewPlaylists(token || null)
  
  return (
    <SectionsContainer className={className} {...rest}>
      <SectionsTitle
        title="Suas Playlists"
        dividerMargins="my-2"
      />
      
      <SectionsItemsContainer>
        {(!token || previewPlaylists?.length === 0) && (
          <CreatePlaylistCard />
        )}

        {!previewPlaylists && token && (
          <LoadingIcon />
        )}

        {token && previewPlaylists?.map((playlist: PreviewPlaylist) => 
          <PlaylistCard
            key={playlist.id}
            playlist={playlist}
          />
        )}
      </SectionsItemsContainer>
    </SectionsContainer>
  );
}
