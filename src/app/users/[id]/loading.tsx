import { UserSectionsItemsContainer } from "@/components/UserPage/UserSections/UserSectionsItemsContainer";
import { UserSectionsTitle } from "@/components/UserPage/UserSections/UserSectionsTitle";

export default function Loading() {
  const sectionsInfo = [
    'Playlists públicas',
    'Músicas favoritas',
    'Álbuns favoritos',
    'Artistas favoritos'
  ]

  return (
    <div className="p-5 pb-20 relative min-h-full">
      <div
        className="absolute inset-0 -z-50"
        style={{ background: `radial-gradient(circle at top right, #52525B30, transparent 100%) fixed` }}
      />

      <div className="flex flex-col gap-6">
        <section className="flex items-center gap-4">
          <div className="size-56 aspect-square rounded-xl loading"/>

          <div className="flex flex-col gap-3">
            <div className="w-72 h-9 rounded-lg loading" />
            <div className="w-64 h-4 rounded-md loading" />
          </div>
        </section>

        {sectionsInfo.map((sectionInfo, i) => 
          <section key={i}>
            <UserSectionsTitle title={sectionInfo} />

            <UserSectionsItemsContainer>
              {Array.from({length: 9}).map((_, j) => 
                <div key={j} className="w-44 flex flex-col gap-3 p-3 rounded-md">
                  <div className={`
                    w-full aspect-square loading
                    ${i === 3 ? 'rounded-full' : 'rounded-md'}
                  `}/>

                  <div className="flex flex-col gap-2">
                    <div className="w-full h-3 loading rounded-md" />
                    <div className="w-1/2 h-3 loading rounded-md" />
                  </div>
                </div>
              )}
            </UserSectionsItemsContainer>
          </section>
        )}
      </div>
    </div>
  )
}