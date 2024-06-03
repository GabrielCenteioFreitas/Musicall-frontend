import { Logo } from "./Logo";
import { Profile } from "./Profile";
import { SearchInput } from "./SearchInput";

export const Header = () => {
  return (
    <header className="flex gap-4">
      <Logo />

      <div className="flex-1 flex justify-between items-center">
        <SearchInput />

        <Profile />
      </div>
    </header>
  );
}
