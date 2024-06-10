import { Divider } from "@/components/Divider";

interface DescriptionAsideSectionProps {
  playlist: {
    description: string | null;
  }
}

export const DescriptionAsideSection = ({ playlist }: DescriptionAsideSectionProps) => {
  return (
    <>
      <Divider className="my-3" />

      <div className="w-full flex flex-col gap-1">
        <h3 className="text-xl font-medium">
          Descrição
        </h3>

        <p className="text-sm break-words text-zinc-400">
          {playlist.description}
        </p>
      </div>
    </>
  );
}
