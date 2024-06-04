import { cookies } from "next/headers";
import { Logo } from "./Logo";
import { Profile } from "./Profile";
import { SearchInput } from "./SearchInput";
import { SignIn } from "./SignIn";

export const Header = () => {
  const isAuthenticated = cookies().has('token')

  return (
    <header className="flex gap-4">
      <Logo />

      <div className="flex-1 flex justify-between items-center">
        <SearchInput />

        {isAuthenticated ? (
          <Profile />
        ) : (
          <SignIn />
        )}
      </div>
    </header>
  );
}
