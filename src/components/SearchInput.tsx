import { ChangeEvent, ComponentProps } from "react";
import { IoSearch } from "react-icons/io5";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface SearchInputProps extends ComponentProps<"input"> {
  search: string;
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput = ({ search, handleSearch, ...rest }: SearchInputProps) => {
  return (
    <div className="flex gap-1 items-center max-w-50 group">
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        className={cn(`
          bg-transparent focus:outline-0 w-full transition-colors
          border-b border-b-zinc-600 group-focus-within:border-b-zinc-300
        `, rest.className)}
        {...rest}
      />
      <Button
        variant="ghost"
        size="icon"
        type="submit"
        className="!p-0 shrink-0 !size-6 mb-px"
      >
        <IoSearch
          size={32}
          className="text-zinc-600 group-focus-within:text-zinc-300 transition-colors"
        />
      </Button>
    </div>
  );
}
