import React from "react";
import { ILogsEachItemModalComponentCustom } from "../../interfaces/logs/ILogs.interface";

const LogsEachItemModalComponentCustom = ({
  nameLabel,
  desc,
  index,
  lengthArray,
}: ILogsEachItemModalComponentCustom) => {
  const handleClassItemFirstAndLastItem = (
    index: number,
    first: string,
    last: string,
    other: string
  ) => {
    return {
      model: index == 0 ? first : lengthArray - 1 == index ? last : other,
    };
  };
  const label = (name: string) => <p className="text-center text-sm">{name}</p>;
  const descriptionItem = (name: string) => (
    <p className="text-center text-sm">{name}</p>
  );
  return (
    <div
      className={`capitalize w-full font-medium ${
        handleClassItemFirstAndLastItem(
          index,
          "text-left",
          "text-right",
          "text-center"
        ).model
      }`}
      key={index}
    >
      {label(nameLabel)}
      {descriptionItem(desc)}
    </div>
  );
};

export default LogsEachItemModalComponentCustom;
