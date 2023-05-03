import React from "react";
import { ILogsBoxEachItemStaticBeforeAfterComponentCustom } from "../../../interfaces/logs/ILogs.interface";

const LogsBoxEachItemStaticBeforeAfterComponentCustom = ({
  children,
  title,
}: ILogsBoxEachItemStaticBeforeAfterComponentCustom) => {
  return (
    <div className="flex flex-col">
      <h1 className="text-base px-[30px]">{title}</h1>
      <div className="flex">{children}</div>
    </div>
  );
};

export default LogsBoxEachItemStaticBeforeAfterComponentCustom;
