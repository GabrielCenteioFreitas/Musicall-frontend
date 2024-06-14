'use client'

import { usePathname } from "next/navigation";
import { GoHome, GoHomeFill } from "react-icons/go";
import { MdLibraryMusic, MdOutlineLibraryMusic } from "react-icons/md";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import { PageItem } from "./PageItem";

export const PagesSection = () => {
  const pathname = usePathname();
  
  return (
    <nav>
      <ul className="text-md flex flex-col gap-3 font-medium #000000">
        <PageItem
          name="Home"
          href="/"
          active={pathname === '/'}
        >
          {pathname === '/' ? (
            <GoHomeFill size={20} />
          ) : (
            <GoHome size={20} />
          )}
        </PageItem>

        <PageItem
          name="Biblioteca"
          href="/library"
          active={pathname === '/library'}
        >
          {pathname === '/library' ? (
            <MdLibraryMusic size={20} />
          ) : (
            <MdOutlineLibraryMusic size={20} />
          )}
        </PageItem>

        <PageItem
          name="Favoritos"
          href="/favorites"
          active={pathname === '/favorites'}
        >
          {pathname === '/favorites' ? (
            <VscHeartFilled size={20} />
          ) : (
            <VscHeart size={20} />
          )}
        </PageItem>
      </ul>
    </nav>
  );
}
