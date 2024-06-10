'use client'

import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

export const SearchInput = () => {
  const router = useRouter()
  const pathname = usePathname()
  const urlParams = useSearchParams()
  const term = urlParams?.get('term')
  const [search, setSearch] = useState(term || '')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const term = formData.get('term')

    if (!term) {
      router.push('/')
      return
    }
    
    const url = `/search?term=${term}`
    router.push(url)
  }

  useEffect(() => {
    if (pathname !== '/search') {
      setSearch('')
    }
  }, [pathname])
  
  return (
    <form
      className="
        w-full max-w-[360px] flex items-center gap-2 py-2 px-3
        outline outline-1 outline-zinc-800 hover:outline-zinc-600
        bg-zinc-950 rounded-xl
        focus-within:outline-2 focus-within:outline-zinc-600"
      onSubmit={handleSubmit}
    >
      <Button
        variant="ghost"
        size="icon"
        type="submit"
        className="!p-0 shrink-0 !size-5 hover:!bg-transparent"
      >
        <IoSearch size={20} className="hover:scale-105 transition-all" />
      </Button>

      <input
        name="term"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Pesquisar"
        className="bg-transparent focus:outline-0 placeholder:text-zinc-600 w-full"
      />
    </form>
  );
}
