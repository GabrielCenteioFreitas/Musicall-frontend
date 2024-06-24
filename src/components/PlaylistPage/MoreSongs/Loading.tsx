import { TableHead } from "@/components/TableHead";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { LuClock } from "react-icons/lu";

export const Loading = () => {
  return (
    <>
      <Table className="w-full table-fixed">
        <TableHeader className="text-md text-zinc-200/40">
          <TableRow className="border-b border-b-zinc-200/40 text-left">
            <TableHead className="w-9 pl-3">#</TableHead>
            <TableHead className="w-1/2">Título</TableHead>
            <TableHead className="w-1/2">Álbum</TableHead>
            <TableHead className="w-16"><LuClock size={20} /></TableHead>
            <TableHead className="w-28"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>       
          {Array.from({ length: 10 }).map((_, i) => 
            <TableRow key={i}>
              <TableCell className="pl-3">
                {i+1}
              </TableCell>
        
              <TableCell className="flex items-center gap-2">
                <div className="size-12 rounded-lg h-full aspect-square loading" />
        
                <div className="flex flex-col justify-center gap-2">
                  <div className="h-4 w-24 rounded-md loading" />
                  <div className="h-2 w-16 rounded-md loading" />
                </div>
              </TableCell>
        
              <TableCell>
                <div className="h-4 w-44 rounded-md loading" />
              </TableCell>
        
              <TableCell>
                <div className="h-4 w-8 rounded-md loading" />
              </TableCell>
        
              <TableCell className="pr-3">
                <div className="ml-4 size-5 rounded-full loading" />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex gap-2">
        {Array.from({ length: 5 }).map((_, i) => 
          <div
            key={i}
            className="size-10 loading rounded-md"
          />
        )}
      </div>
    </>
  );
}
