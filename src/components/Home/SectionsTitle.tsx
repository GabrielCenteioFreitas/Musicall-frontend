import { Divider } from "../Divider";

interface SectionsTitleProps {
  title: string;
  dividerMargins: string;
}

export const SectionsTitle = ({ title, dividerMargins }: SectionsTitleProps) => {
  return (
    <>
      <h2 className="text-2xl font-semibold">
        {title}
      </h2>

      <Divider className={dividerMargins} />
    </>
  );
}
