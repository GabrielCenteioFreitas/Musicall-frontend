import { AlbumsSection } from "@/components/Search/Sections/AlbumsSection";
import { ArtistsSection } from "@/components/Search/Sections/ArtistsSection";
import { FiltersSection } from "@/components/Search/Sections/FiltersSection";
import { SongsSection } from "@/components/Search/Sections/SongsSection";
import { PlaylistsSection } from "@/components/Search/Sections/PlaylistsSection";
import Loading from "./loading";
import { Suspense } from "react";

const SearchPage = ({
  searchParams
}: {
  searchParams: {
    term: string;
    entity: string | undefined;
  }
}) => {
  const { term, entity } = searchParams

  return (
    <Suspense key={`${term}-${entity}`} fallback={<Loading entity={entity} />}>
      <div className="flex flex-col gap-5 p-5 pb-20">
        <FiltersSection term={term} entity={entity} />

        {(!entity || entity === 'song') && <SongsSection term={term} entity={entity} />}
        {(!entity || entity === 'album') && <AlbumsSection term={term} entity={entity} />}
        {(!entity || entity === 'musicArtist') && <ArtistsSection term={term} entity={entity} />}
        
        {(entity === 'playlist') && <PlaylistsSection term={term} />}
      </div>
    </Suspense>
  );
}

export default SearchPage;