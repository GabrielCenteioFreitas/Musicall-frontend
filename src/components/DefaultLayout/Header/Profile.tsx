import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { GoPerson } from "react-icons/go";
import { VscSymbolColor } from "react-icons/vsc";
import { LuLogOut } from "react-icons/lu";

export const Profile = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="size-10 bg-zinc-900 rounded-full p-0.5 overflow-hidden cursor-pointer">
          <Image
            src="https://github.com/GabrielCenteioFreitas.png"
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

        <DropdownMenuItem className="flex gap-1">
          <LuLogOut size={16} /> Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
