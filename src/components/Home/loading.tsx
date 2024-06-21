import { SectionsItemsContainer } from "@/components/Home/SectionsItemsContainer";
import { SectionsContainer } from "@/components/SectionsContainer";
import { SectionsTitle } from "@/components/SectionsTitle";

export const Loading = () => {
  return (
    <div className="flex flex-col gap-5 p-5 pb-20">
      <SectionsContainer>
        <SectionsTitle title="Suas Playlists" dividerMargins="my-2"/>

        <SectionsItemsContainer>
          {Array.from({length: 5}).map((_, i) => 
            <div key={i} className="p-3 flex flex-col gap-3">
              <div className="w-full aspect-square rounded-md loading" />

              <div className="flex flex-col gap-2.5">
                <div className="w-full h-3 loading rounded-md" />
                <div className="w-1/2 h-3 loading rounded-md" />
              </div>
            </div>
          )}
        </SectionsItemsContainer>
      </SectionsContainer>

      <SectionsContainer>
        <SectionsTitle title="Gêneros" dividerMargins="mt-2 mb-4"/>

        {Array.from({length: 2}).map((_, i) => 
          <SectionsContainer key={i} className="mb-4">
            <div className="w-24 h-5 rounded-md loading" />
      
            <SectionsItemsContainer className="grid-cols-8">
              {Array.from({length: 8}).map((_, j) => 
                <div key={j} className="flex flex-col gap-3 p-3 rounded-md">
                  <div className="w-full aspect-square rounded-md loading" />

                  <div className="flex flex-col gap-2">
                    <div className="w-full h-3 loading rounded-md" />
                    <div className="w-1/2 h-3 loading rounded-md" />
                  </div>
                </div>
              )}
            </SectionsItemsContainer>
          </SectionsContainer>
        )}
      </SectionsContainer>
    </div>
  )
}