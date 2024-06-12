import { Button } from "@/components/ui/button";
import { ChangeEvent } from "react";
import { IoSearch } from "react-icons/io5";
import { DebouncedState } from "use-debounce";

interface SearchInputProps {
  handleInputChange: DebouncedState<(e: ChangeEvent<HTMLInputElement>) => Promise<void>>;
}

export const SearchInput = ({ handleInputChange }: SearchInputProps) => {
  return (
    <div
      className="
        w-full max-w-[360px] flex items-center gap-2 py-2 px-3
        outline outline-1 outline-zinc-800 hover:outline-zinc-600
        bg-zinc-950 rounded-xl
        focus-within:outline-2 focus-within:outline-zinc-600"
    >
      <Button
        variant="ghost"
        size="icon"
        type="submit"
        className="!p-0 shrink-0 !size-5 hover:!bg-transparent"
      >
        <IoSearch size={20} className="hover:scale-105 transition-all" />
      </Button>

      <input
        type="text"
        onChange={handleInputChange}
        placeholder="Pesquisar"
        className="bg-transparent focus:outline-0 placeholder:text-zinc-600 w-full"
      />
    </div>
  );
}
