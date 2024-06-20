import { SectionsContainer } from "@/components/SectionsContainer";
import { SectionsTitle } from "@/components/SectionsTitle";

interface LoadingProps {
  entity: string | undefined;
}

export default function Loading({ entity }: LoadingProps) {
  return (
    <div className="flex flex-col gap-5 p-5 pb-20">
      <section className="flex gap-3">
        {Array.from({length: 5}).map((_, i) => 
          <div key={i} className="w-24 h-8 rounded-lg loading" />
        )}
      </section>

      {(!entity || entity === 'song') && (
        <SectionsContainer>
          <SectionsTitle title="Músicas" dividerMargins="my-2" />

          <div className="flex gap-60 -ml-2">
            {Array.from({length: 2}).map((_, i) =>
              <div key={i} className="w-fit">
                {Array.from({length: entity === 'song' ? 8 : 5}).map((_, j) => 
                  <div key={j} className="pl-2 pr-4 py-2
                    grid grid-cols-[4rem_20rem_3.33rem_3rem] gap-3 items-center justify-start
                  ">
                    <div className="size-16 loading rounded-xl"/>

                    <div className="flex-1 flex flex-col gap-2 text-left w-[20rem]">
                      <span className="w-3/4 h-3 loading rounded-md" />
                      <span className="w-1/3 h-3 loading rounded-md" />
                    </div>

                    <div className="flex items-center gap-2.5"> 
                      {Array.from({length: 2}).map((_, k) => 
                        <div key={k} className="size-5 rounded-md loading" />
                      )}                   
                    </div>

                    <span className="ml-3 w-12 h-3 rounded-md loading" />
                  </div>
                )}
              </div>
            )}
          </div>
        </SectionsContainer>
      )}

      {(!entity || entity === 'album') && (
        <SectionsContainer>
          <SectionsTitle title="Álbuns" dividerMargins="my-2" />

          <div className="grid grid-cols-8 -ml-3">
            {Array.from({length: entity === 'album' ? 16 : 8}).map((_, j) => 
              <div key={j} className="flex flex-col gap-3 p-3 rounded-md">
                <div className="w-full aspect-square loading rounded-md" />

                <div className="flex flex-col gap-2">
                  <span className="w-full h-3 loading rounded-md" />
                  <span className="w-1/2 h-3 loading rounded-md" />
                </div>
              </div>
            )}
          </div>
        </SectionsContainer>
      )}

      {(!entity || entity === 'musicArtist') && (
        <SectionsContainer>
          <SectionsTitle title="Artistas" dividerMargins="my-2" />

          <div className="grid grid-cols-8 -ml-3">
            {Array.from({length: entity === 'musicArtist' ? 16 : 8}).map((_, j) => 
              <div key={j} className="flex flex-col gap-3 p-3 rounded-md">
                <div className="w-full aspect-square loading rounded-full" />

                <div className="flex flex-col gap-2">
                  <span className="w-full h-3 loading rounded-md" />
                  <span className="w-1/2 h-3 loading rounded-md" />
                </div>
              </div>
            )}
          </div>
        </SectionsContainer>
      )}
    </div>
  )
}