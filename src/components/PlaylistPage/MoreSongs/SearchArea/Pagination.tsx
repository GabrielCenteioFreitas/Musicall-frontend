import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  qntSongs: number;
}

export const Pagination = ({ page, setPage, qntSongs }: PaginationProps) => {
  const qntPages = Math.ceil(qntSongs / 10) > 1 ? Math.ceil(qntSongs / 10) : 0

  return (
    <div className="flex gap-2">
      {Array.from({ length: qntPages }).map((_, i) => {
        const isCurrentPageActive = i+1 === page

        return (
          <Button
            key={i}
            size="icon"
            onClick={() => setPage(i+1)}
            className={cn("size-10 !p-0",
              isCurrentPageActive && "dark:bg-zinc-700 dark:hover:bg-zinc-700"
            )}
          >
            {i+1}
          </Button>
        )
      })}
    </div>
  );
}
