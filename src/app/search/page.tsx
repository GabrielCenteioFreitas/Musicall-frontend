'use client'

import { AlbumsSection } from "@/components/Search/Sections/AlbumsSection";
import { ArtistsSection } from "@/components/Search/Sections/ArtistsSection";
import { FiltersSection } from "@/components/Search/Sections/FiltersSection";
import { SongsSection } from "@/components/Search/Sections/SongsSection";
import { useSearchParams } from "next/navigation";

const SearchPage = () => {
  const urlSearchParams = useSearchParams();
  const term = urlSearchParams.get('term') as string;
  const entity = urlSearchParams.get('entity');

  return (
    <div className="flex flex-col gap-5 p-5 pb-20">
      <FiltersSection term={term} entity={entity} />

      {(!entity || entity === 'song') && <SongsSection term={term} entity={entity} />}
      {(!entity || entity === 'album') && <AlbumsSection term={term} entity={entity} />}
      {(!entity || entity === 'musicArtist') && <ArtistsSection term={term} entity={entity} />}
    </div>
  );
}

export default SearchPage;