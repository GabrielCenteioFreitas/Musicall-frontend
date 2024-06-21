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
    <div className="p-5 pb-20 relative min-h-full">
      <div
        className="absolute inset-0 -z-50"
        style={{ background: `radial-gradient(circle at top right, #52525B30, transparent 100%) fixed` }}
      />

      <div className="flex flex-col gap-4">
        <section className="flex items-center gap-4">
          <div className="size-48 loading rounded-lg" />

          <div className="flex flex-col gap-2">
            <div className="w-56 h-10 loading rounded-lg" />
            <div className="w-40 h-5 loading rounded-md" />
          </div>
        </section>

        <section className="flex flex-col gap-7 w-3/4">
          <div className="flex justify-between">
            <div className="flex gap-3 items-center">
              <div className="size-11 loading rounded-full"/>
              <div className="size-6 loading rounded-md"/>
              <div className="size-6 loading rounded-md"/>
              <div className="size-6 loading rounded-md"/>
            </div>

            <div className="w-48 h-6 loading rounded-md" />
          </div>

          <Table className="w-full table-fixed">
            <TableHeader className="text-md text-zinc-200/40">
              <TableRow className="border-b border-b-zinc-200/40 text-left">
                <TableHead className="w-10 pl-3">#</TableHead>
                <TableHead className="w-full px-2">Título</TableHead>
                <TableHead className="w-16"><LuClock size={20} /></TableHead>
                <TableHead className="w-28"></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {Array.from({length: 8}).map((_, i) => 
                <TableRow key={i}>
                  <TableCell className="text-zinc-400 pl-3">
                    {i+1}
                  </TableCell>
            
                  <TableCell className="py-3 px-2 flex flex-col gap-2 justify-center">
                    <div className="w-28 h-3.5 loading rounded-md" />
          
                    <div className="w-16 h-2.5 loading rounded-md" />
                  </TableCell>

                  <TableCell>
                    <div className="flex">
                      <div className="w-full h-3 loading rounded-md" />
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
    </div>
  )
}