'use client'

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Filter = {
  display: string;
  entity: string;
}

interface FiltersSectionProps  {
  term: string;
  entity: string | undefined;
}

export const FiltersSection = ({ term, entity }: FiltersSectionProps) => {
  const router = useRouter()
  const pathname = usePathname();

  const filters: Filter[] = [
    {display: 'Tudo', entity: ''}, 
    {display: 'Músicas', entity: 'song'},
    {display: 'Álbuns', entity: 'album'}, 
    {display: 'Artistas', entity: 'musicArtist'},
    {display: 'Playlists', entity: 'playlist'},
  ]
  const [currentFilter, setCurrentFilter] = useState<Filter>(
    filters.find(filter => filter.entity === entity) || filters[0]
  )

  const handleChangeCurrentFilter = (filter: Filter) => {
    setCurrentFilter(filter)
  }

  useEffect(() => {
    let url = `${pathname}?term=${term}`
    if (currentFilter.entity !== '') {
      url = url.concat(`&entity=${currentFilter.entity}`)
    }
    router.push(url)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFilter, entity])

  return (
    <section className="flex gap-3">
      {filters.map((filter, i) => 
        <Button
          key={i}
          className={cn(`
            font-medium !rounded-lg !py-1.5 !px-5 !h-auto`,
            filter.entity === currentFilter.entity
              ? 'dark:bg-zinc-50 dark:text-zinc-950 font-semibold disabled:opacity-100'
              : ''
          )}
          disabled={filter.entity === currentFilter.entity}
          onClick={() => handleChangeCurrentFilter(filter)}
        >
          {filter.display}
        </Button>
      )}
    </section>
  );
}
