import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getUser } from "@/lib/auth";
import Image from "next/image";
import { GoPerson } from "react-icons/go";
import { LuLogOut } from "react-icons/lu";
import { VscSymbolColor } from "react-icons/vsc";

export const Profile = () => {
  const { name, avatarUrl } = getUser()

  return (
    <div className="flex items-center gap-2">
      <span className="max-w-44 text-sm text-right line-clamp-1">
        {name}
      </span>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="size-10 bg-zinc-900 rounded-full p-0.5 overflow-hidden cursor-pointer">
            <Image
              src={avatarUrl}
              alt="Gabriel Freitas"
              className="size-full rounded-full"
              width={40}
              height={40}
            />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel className="text-left">
            Configurações
          </DropdownMenuLabel>

          <DropdownMenuSeparator/>

          <DropdownMenuItem className="flex gap-1">
            <GoPerson size={16} /> Perfil
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-1">
            <VscSymbolColor size={16} /> Tema
          </DropdownMenuItem>

          <DropdownMenuSeparator/>

          <DropdownMenuItem className="flex gap-1 cursor-pointer" asChild>
            <a href="/api/auth/logout">
              <LuLogOut size={16} /> Sair
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
