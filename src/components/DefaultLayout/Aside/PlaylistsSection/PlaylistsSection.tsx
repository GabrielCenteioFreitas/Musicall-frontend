import { PlaylistItem } from "./PlaylistItem";

export const PlaylistsSection = () => {
  return (
    <ul className="-ml-2 -mt-2 mb-16 text-xs flex flex-col font-medium overflow-y-scroll no-scrollbar">
      {Array.from({ length: 12 }).map((_, i) => 
        <PlaylistItem
          key={i}
          playlist={{
            name: `Playlist ${i+1}`,
            creator: "Gabriel Centeio Freitas",
          }}
        />
      )}
    </ul>
  );
}
