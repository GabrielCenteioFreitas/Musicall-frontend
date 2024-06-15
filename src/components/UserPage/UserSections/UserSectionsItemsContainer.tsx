import { ReactNode } from "react";

interface UserSectionsItemsContainerProps {
  children: ReactNode;
}

export const UserSectionsItemsContainer = ({ children }: UserSectionsItemsContainerProps) => {
  return (
    <div className="-ml-3 flex overflow-x-scroll no-scrollbar">
      {children}
    </div>
  );
}
