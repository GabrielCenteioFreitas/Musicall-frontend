import { Divider } from "../../Divider";
import { PagesSection } from "./PagesSection/PagesSection";
import { PlaylistsSection } from "./PlaylistsSection/PlaylistsSection";

export const Aside = () => {
  return (
    <aside className="w-60 flex flex-col gap-4">
      <PagesSection />

      <Divider />

      <PlaylistsSection />
    </aside>
  );
}
