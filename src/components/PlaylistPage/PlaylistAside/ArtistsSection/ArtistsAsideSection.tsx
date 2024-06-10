import { Divider } from "@/components/Divider";
import { Playlist } from "@/types/playlist";
import { ArtistItem } from "./ArtistItem";

interface ArtistsAsideSectionProps {
  playlist: Playlist;
}

export const ArtistsAsideSection = ({ playlist }: ArtistsAsideSectionProps) => {
  const differentArtists = Array.from(
    playlist.songs?.reduce((acc, curSong) => {
      const artist = {
        id: curSong.song.artist.id,
        name: curSong.song.artist.name,
      };
  
      acc.set(artist.id, artist);
  
      return acc;
    }, new Map()).values()
  );

  if (differentArtists.length === 0) {
    return null
  }

  return (
    <>
      <Divider className="my-3" />

      <div className="w-full flex flex-col -ml-2 gap-1">
        <h3 className="text-xl font-medium ml-2">
          Artistas
        </h3>

        <ul className="w-full flex flex-col">
          {differentArtists.map(artist => 
            <ArtistItem key={artist.id} artist={artist} />
          )}
        </ul>
      </div>
    </>
  );
}
