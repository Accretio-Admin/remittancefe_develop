import Image from "next/image";

export const TableDataGridIconSortingDesAndAscCustom = ({
  name,
}: {
  name: string;
}) => {
  return (
    <div className="bg-nsConcrete1 rounded-nsMd w-[28px] h-[28px] flex items-center justify-center shadow-nsTwo">
      <Image
        src={`/sort-alpha-${name}.svg`}
        width={17}
        height={17}
        alt="Sorting Descending"
      />
    </div>
  );
};
