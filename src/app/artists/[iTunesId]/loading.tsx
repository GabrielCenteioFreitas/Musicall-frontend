import { TableHead } from "@/components/TableHead";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Loading() {
  return (
    <div className="p-5 pb-20 relative min-h-full">
      <div
        className="absolute inset-0 -z-50"
        style={{ background: `radial-gradient(circle at top right, #52525B30, transparent 100%) fixed` }}
      />

      <div className="flex flex-col gap-4">
        <section className="flex items-center gap-4">
          <div className="size-48 loading rounded-full" />

          <div className="flex flex-col gap-2">
            <h2 className="w-48 h-10 loading rounded-lg" />
            <span className="w-24 h-5 loading rounded-md" />
          </div>
        </section>

        <section className="flex flex-col gap-7 w-full">
          <div className="flex justify-between">
            <div className="w-48 flex gap-2 justify-center items-center">
              <div className="size-6 loading rounded-md"/>
              <div className="size-6 loading rounded-md"/>
            </div>

            <div className="w-48 h-6 loading rounded-md" />
          </div>

          <Table className="w-full table-fixed">
            <TableHeader className="text-md text-zinc-200/40">
              <TableRow className="border-b border-b-zinc-200/40 text-left">
                <TableHead className="w-10 pl-3">#</TableHead>
                <TableHead className="w-full px-2">Álbum</TableHead>
                <TableHead className="w-48">Músicas</TableHead>
                <TableHead className="w-52">Gênero</TableHead>
                <TableHead className="w-28"></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {Array.from({length: 8}).map((_, i) => 
                <TableRow key={i}>
                  <TableCell className="text-base text-zinc-400 pl-3">
                    {i+1}
                  </TableCell>
            
                  <TableCell className="flex items-center gap-2 px-2 py-2.5">
                    <div className="size-12 loading rounded-lg"/>
            
                    <div className="flex flex-col justify-center gap-2">
                      <span className="w-40 h-3 loading rounded-md" />
            
                      <span className="w-16 h-2.5 loading rounded-md" />
                    </div>
                  </TableCell>
            
                  <TableCell>
                    <div className="flex">
                      <span className="w-24 h-3 loading rounded-md" />
                    </div>
                  </TableCell>
            
                  <TableCell>
                    <div className="flex">
                      <span className="w-24 h-3 loading rounded-md" />
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