import { Divider } from "@/components/Divider";
import { TableHead } from "@/components/TableHead";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LuClock } from "react-icons/lu";

export default function Loading() {
  return (
    <div className="flex gap-5 p-5 pb-20 relative min-h-full">
      <div
        className="absolute inset-0 -z-50"
        style={{ background: `radial-gradient(circle at top right, #52525B30, transparent 100%) fixed` }}
      />

      <div className="flex-1 flex flex-col gap-4">
        <section className="flex flex-col gap-3">
          <h2 className="w-48 h-11 loading rounded-lg" />

          <div className="w-72 h-8 loading rounded-md" />
        </section>

        <section className="flex flex-col gap-7">
          <div className="flex justify-between">
            <div className="size-11 loading rounded-full"/>

            <div className="w-48 h-6 loading rounded-md" />
          </div>

          <Table className="w-full table-fixed">
            <TableHeader className="text-md text-zinc-200/40">
              <TableRow className="border-b border-b-zinc-200/40 text-left">
                <TableHead className="w-9 pl-3">#</TableHead>
                <TableHead className="w-1/2">Título</TableHead>
                <TableHead className="w-1/2">Álbum</TableHead>
                <TableHead className="w-16"><LuClock size={20} /></TableHead>
                <TableHead className="w-44">Adicionada em</TableHead>
                <TableHead className="w-28"></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {Array.from({length: 8}).map((_, i) => 
                <TableRow key={i}>
                  <TableCell className="text-sm text-zinc-400 pl-3">
                    {i+1}
                  </TableCell>
            
                  <TableCell className="flex items-center gap-2 px-2 py-2.5">
                    <div className="size-12 loading rounded-lg"/>
            
                    <div className="flex flex-col justify-center gap-2">
                      <span className="w-36 h-3 loading rounded-md" />
            
                      <span className="w-20 h-2.5 loading rounded-md" />
                    </div>
                  </TableCell>
            
                  <TableCell>
                    <div className="flex">
                      <span className="w-44 h-3 loading rounded-md" />
                    </div>
                  </TableCell>
            
                  <TableCell>
                    <div className="flex">
                      <span className="w-full h-3 loading rounded-md" />
                    </div>
                  </TableCell>
            
                  <TableCell>
                    <div className="flex">
                      <span className="w-36 h-3 loading rounded-md" />
                    </div>
                  </TableCell>
            
                  <TableCell className="pr-3">
                    <div className="flex gap-1.5">
                      <div className="size-5 loading rounded-md"/>
                      <div className="size-5 loading rounded-md"/>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </section>
      </div>

      <aside className="w-80 flex flex-col items-center">
        <div className="w-full aspect-square rounded-xl loading"/>

        <Divider className="my-3" />

        <div className="w-full flex flex-col gap-1">
          <h3 className="w-1/2 h-5 rounded-md loading" />

          <ul className="w-full flex flex-col">
            {Array.from({length: 3}).map((_, i) => 
              <li key={i} className="w-full">
                <div className="w-full h-fit py-2 flex items-center justify-start gap-3">
                  <div className="size-14 rounded-full loading shrink-0" />

                  <div className="w-full flex flex-col gap-2 justify-center">
                    <span className="w-3/4 h-3 rounded-md loading" />
                    <span className="w-12 h-2 rounded-md loading" />
                  </div>
                </div>
              </li>
            )}
          </ul>
        </div>
      </aside> 
    </div>
  )
}