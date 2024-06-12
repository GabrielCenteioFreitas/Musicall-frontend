'use client'

import { getDataFromSearch } from "@/lib/getITunesData"
import { ITunesSong } from "@/types/song"
import { ChangeEvent, useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import { MoreSongsTable } from "./MoreSongsTable"
import { Pagination } from "./Pagination"
import { SearchInput } from "./SearchInput"

export const SearchArea = () => {
  const [songs, setSongs] = useState<ITunesSong[] | null>(null)
  const [page, setPage] = useState(1)
  const [term, setTerm] = useState('')

  const handleInputChange = useDebouncedCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const termValue = e.target.value

    if (!termValue) {
      setSongs(null)
      return
    }

    setTerm(termValue)
    setPage(1)
    const { results } = await getDataFromSearch({
      term: termValue,
      entity: 'song',
      limit: 50,
    })
    setSongs(results)
  }, 300)

  useEffect(() => {
    if (!term) {
      setSongs(null)
      return
    }

    async function fetchData() {
      const { results } = await getDataFromSearch({
        term,
        entity: 'song',
        limit: 50,
      })
  
      setSongs(results)
    }

    fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])
  
  return (
    <div className="flex flex-col gap-4">
      <h6 className="text-2xl font-semibold">Deseja adicionar mais músicas?</h6>

      <SearchInput handleInputChange={handleInputChange} />

      {songs && songs?.length > 0 && (
        <>
          <MoreSongsTable songs={songs.slice(10*(page-1), 10*page)} page={page} />

          <Pagination page={page} setPage={setPage} qntSongs={songs.length} />
        </>
      )}
    </div>
  );
}
