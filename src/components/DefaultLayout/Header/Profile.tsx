import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getUserFromServer } from "@/lib/getUserFromServer";
import Image from "next/image";
import { GoPerson } from "react-icons/go";
import { LuLogOut } from "react-icons/lu";
import { VscSymbolColor } from "react-icons/vsc";

export const Profile = () => {
  const user = getUserFromServer()
  if (!user) {
    return null
  }
  const { name, avatarUrl } = user

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="max-w-44 text-sm text-right line-clamp-1">
            {name}
          </span>
          <Image
            src={avatarUrl}
            alt={name}
            className="size-10 bg-zinc-900 rounded-full"
            width={50}
            height={50}
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
  );
}
