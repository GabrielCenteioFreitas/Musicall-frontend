import { SectionsItemsContainer } from "@/components/Home/SectionsItemsContainer";
import { SectionsTitle } from "@/components/SectionsTitle";

export default function Loading() {
  return (
    <div className="flex flex-col p-5 pb-20">
      <SectionsTitle title="Biblioteca" dividerMargins="my-2" />

      <SectionsItemsContainer>
        {Array.from({length: 14}).map((_, i) => 
          <div key={i} className="flex flex-col gap-2 p-3">
            <div className="size-48 loading rounded-md" />

            <div className="flex flex-col gap-2">
              <span className="w-full h-3 loading rounded-md" />
              <span className="w-1/2 h-3 loading rounded-md" />
            </div>
          </div>
        )}
      </SectionsItemsContainer>
    </div>
  )
}