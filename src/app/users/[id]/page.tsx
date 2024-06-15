import { UserInfo } from "@/components/UserPage/UserInfo/UserInfo";
import { UserSections } from "@/components/UserPage/UserSections/UserSections";
import { url } from "@/lib/api";
import { getPredominantColor } from "@/lib/getPredominantColor";
import { getUserFromServer } from "@/lib/getUserFromServer";
import { DBUser } from "@/types/user";
import { redirect } from "next/navigation";

const UserPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const response = await fetch(
    url(`/users/${id}`),
    {
      method: 'GET',
      cache: 'no-store',
    }
  )
  const data = await response.json()
  const user: DBUser | undefined = data.user;
  
  if (!user) {
    return redirect('/')
  }

  const currentUser = getUserFromServer()
  const isUserTheCreator = user.id === currentUser?.sub

  const predominantColor = await getPredominantColor(user.avatarUrl)
  
  return (
    <div className="p-5 pb-20 relative min-h-full">
      <div
        className="absolute inset-0 -z-50"
        style={{ background: `radial-gradient(circle at top right, ${predominantColor}30, transparent 100%) fixed` }}
      />

      <div className="flex flex-col gap-6">
        <UserInfo
          user={user}
          predominantColor={predominantColor || "#52525B"}
          id={id}
          isUserTheCreator={isUserTheCreator}
        />

        <UserSections
          playlists={user.playlists}
          favoriteSongs={user.favoriteSongs}
          favoriteAlbums={user.favoriteAlbums}
          favoriteArtists={user.favoriteArtists}
        />
      </div>
    </div>
  );
}

export default UserPage;