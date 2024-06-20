import { SectionsTitle } from "@/components/SectionsTitle";

export default function Loading() {
  const sectionsInfo = [
    'Músicas favoritas',
    'Álbuns favoritos',
    'Artistas favoritos'
  ]

  return (
    <div className="space-y-5 p-5 pb-20">
      {sectionsInfo.map((sectionInfo, i) => 
        <section key={i}>
          <SectionsTitle title={sectionInfo} dividerMargins="my-2" />

          <div className="grid grid-cols-8 -ml-3">
            {Array.from({length: 8}).map((_, j) => 
              <div key={j} className="flex flex-col gap-3 p-3 rounded-md">
                <div className={`
                  w-full aspect-square loading
                  ${i === 2 ? 'rounded-full' : 'rounded-md'}
                `}/>

                <div className="flex flex-col gap-2">
                  <span className="w-full h-3 loading rounded-md" />
                  <span className="w-1/2 h-3 loading rounded-md" />
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  )
}