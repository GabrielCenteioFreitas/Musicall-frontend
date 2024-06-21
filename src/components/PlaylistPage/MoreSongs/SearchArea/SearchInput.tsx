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
        bg-zinc-950 rounded-xl group
        focus-within:outline-2 focus-within:outline-zinc-600"
    >
      <Button
        type="submit"
        variant="none"
        size="none"
        className="shrink-0 size-5"
        aria-label="Pesquisar"
        asChild
      >
        <label htmlFor="search">
          <IoSearch
            size={20}
            className="
              text-zinc-600 group-focus-within:text-zinc-400 transition-colors
            "
          />
        </label>
      </Button>

      <input
        type="text"
        name="search"
        onChange={handleInputChange}
        placeholder="Pesquisar"
        className="bg-transparent focus:outline-0 placeholder:text-zinc-600 w-full"
        aria-label="Pesquisar"
      />
    </div>
  );
}
