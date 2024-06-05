import { DefaultLayout } from "@/components/DefaultLayout/DefaultLayout";
import { RecentPlaylistsSection } from "@/components/Home/Sections/RecentPlaylistsSection";
import { RecentSongsSection } from "@/components/Home/Sections/RecentSongsSection";
import { YourPlaylistsSection } from "@/components/Home/Sections/YourPlaylistsSection";

export default function Home() {
  return (
    <div className="flex flex-col gap-5 p-5 pb-20">
      <YourPlaylistsSection />

      <RecentSongsSection />

      <RecentPlaylistsSection />
    </div>
  );
}
