import { ArtistPortrait } from "@/components/Portraits/ArtistPortrait";
import { ITunesAlbum } from "@/types/album";
import { ITunesArtist } from "@/types/artist";

interface ArtistInfoProps {
  artist: Pick<ITunesArtist,
    "artistName" | 
    "primaryGenreName" |
    "artistLinkUrl"
  >;
  albums: ITunesAlbum[];
}

export const ArtistInfo = ({ artist, albums }: ArtistInfoProps) => {
  return (
    <div className="flex items-center gap-4 w-full h-fit">
      <ArtistPortrait
        name={artist.artistName}
        className="size-48 text-7xl"
      />

      <div className="flex flex-col gap-0 overflow-hidden py-1">
        <h2 className="text-[2.5rem] font-bold truncate ...">
          {artist.artistName}
        </h2>

        <div className="flex gap-2 items-center text-md text-zinc-400 leading-none">
          <span>{artist.primaryGenreName}</span>
          
          {albums.length > 0 && (
            <>
              •
              <span>
                {albums.length > 1
                  ? `${albums.length} álbuns`
                  : "1 álbum"
                }
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
