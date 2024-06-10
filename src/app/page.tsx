import { RecentSongsSection } from "@/components/Home/Sections/RecentSongsSection";
import { YourPlaylistsSection } from "@/components/Home/Sections/YourPlaylistsSection";
import { cookies } from "next/headers";

export default function Home() {
  const token = cookies().get('token')?.value

  return (
    <div className="flex flex-col gap-5 p-5 pb-20">
      <YourPlaylistsSection />

      {token && (
        <RecentSongsSection />
      )}
    </div>
  );
}
