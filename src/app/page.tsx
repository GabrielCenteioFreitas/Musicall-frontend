import { GenresSection } from "@/components/Home/Sections/GenresSection";
import { YourPlaylistsSection } from "@/components/Home/Sections/YourPlaylistsSection";
import { getFavorites } from "@/lib/getFavoritesData";
import { cookies } from "next/headers";

const Home = async () => {
  const token = cookies().get('token')?.value
  const favorites = await getFavorites(token || null)

  return (
    <div className="flex flex-col gap-5 p-5 pb-20">
      <YourPlaylistsSection />

      {/* {token && (
        <RecentSongsSection />
      )} */}

      <GenresSection favorites={favorites} />
    </div>
  );
}

export default Home;
