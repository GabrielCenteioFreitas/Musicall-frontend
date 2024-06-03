import { IoSearch } from "react-icons/io5";

export const SearchInput = () => {
  return (
    <div className="
      w-full max-w-[360px] flex items-center gap-2 py-2 px-4
      outline outline-1 outline-zinc-800
      bg-zinc-950 hover:outline-zinc-600 rounded-xl
      focus-within:outline-2 focus-within:outline-zinc-600
    ">
      <label htmlFor="search">
        <IoSearch size={20} />
      </label>
      <input
        id="search"
        type="text"
        placeholder="Pesquisar"
        className="bg-transparent focus:outline-0 placeholder:text-zinc-600 w-full"
      />
    </div>
  );
}
