import { GenresSection } from "@/components/Home/Sections/GenresSection";
import { RecentSongsSection } from "@/components/Home/Sections/RecentSongsSection";
import { YourPlaylistsSection } from "@/components/Home/Sections/YourPlaylistsSection";
import { Loading } from "@/components/Home/loading";
import { getFavorites } from "@/lib/getFavoritesData";
import { cookies } from "next/headers";
import { Suspense } from "react";

const Home = async () => {
  const token = cookies().get('token')?.value
  const favorites = await getFavorites(token || null)

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col gap-5 p-5 pb-20">
        <YourPlaylistsSection />

        <RecentSongsSection favorites={favorites} />

        <GenresSection favorites={favorites} />
      </div>
    </Suspense>
  );
}

export default Home;
