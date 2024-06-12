import { Divider } from "@/components/Divider";
import { useState } from "react";
import { SearchArea } from "./SearchArea/SearchArea";

export const MoreSongs = ({  }) => {
  return (
    <div className="mb-5">
      <Divider className="my-6" />
    
      <SearchArea />
    </div>
  );
}
