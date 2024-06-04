import { FaRegHeart } from "react-icons/fa";
import { VscHeart, VscHeartFilled  } from "react-icons/vsc";
import { Divider } from "../../Divider";
import { AsideItem } from "./PageItem";
import { PlaylistItem } from "./PlaylistItem";
import { GoHome, GoHomeFill } from "react-icons/go";
import { MdOutlineLibraryMusic, MdLibraryMusic } from "react-icons/md";

export const Aside = () => {
  let activePage = 'home' // temporário

  return (
    <aside className="w-60 flex flex-col gap-4">
      <ul className="text-md flex flex-col gap-3 font-medium">
        <AsideItem name="Home" active={activePage === 'home'}>
          {activePage === 'home' ? (
            <GoHomeFill size={20} />
          ) : (
            <GoHome size={20} />
          )}
        </AsideItem>

        <AsideItem name="Biblioteca" active={activePage === 'library'}>
          {activePage === 'library' ? (
            <MdLibraryMusic size={20} />
          ) : (
            <MdOutlineLibraryMusic size={20} />
          )}
        </AsideItem>

        <AsideItem name="Favoritos" active={activePage === 'favorites'}>
          {activePage === 'favorites' ? (
            <VscHeartFilled size={20} />
          ) : (
            <VscHeart size={20} />
          )}
        </AsideItem>
      </ul>

      <Divider />

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
    </aside>
  );
}
