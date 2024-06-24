'use client'

import { getDataFromSearch } from "@/lib/getITunesData"
import { ITunesSong } from "@/types/song"
import { ChangeEvent, useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import { Loading } from "../Loading"
import { MoreSongsTable } from "./MoreSongsTable"
import { Pagination } from "./Pagination"
import { SearchInput } from "./SearchInput"
import { toast } from "react-toastify"

export const SearchArea = () => {
  const [songs, setSongs] = useState<ITunesSong[] | null>(null)
  const [page, setPage] = useState(1)
  const [term, setTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = useDebouncedCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const termValue = e.target.value
    setSongs(null)

    if (!termValue) {
      setTerm('')
      return
    }

    setIsLoading(true)
    setTerm(termValue)
    setPage(1)

    await getDataFromSearch({
      term: termValue,
      entity: 'song',
      limit: 50,
    }).then(data => {
      setSongs(data.results)
      setIsLoading(false)
    }).catch(error => {
      console.error(error)
      toast.error('Ocorreu um erro!')
    })
  }, 500)
  
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-2xl font-semibold">Deseja adicionar mais músicas?</h3>

      <SearchInput handleInputChange={handleInputChange} />

      {term !== '' ? (
        songs && songs?.length > 0 ? (
          <>
            <MoreSongsTable songs={songs.slice(10*(page-1), 10*page)} page={page} />
  
            <Pagination page={page} setPage={setPage} qntSongs={songs.length} />
          </>
        ) : isLoading ? (
          <Loading />
        ) : (
          <span>Não foram encontradas músicas relacionadas a sua pesquisa</span>
        )
      ) : null}
    </div>
  );
}
