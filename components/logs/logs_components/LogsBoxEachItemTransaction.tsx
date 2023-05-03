import React from "react";
import LogsBoxEachItemStaticBeforeAfterComponentCustom from "./LogsBoxEachItemStaticBeforeAfter";
import { ILogsBoxEachItemStaticBeforeAfterComponentCustom } from "../../../interfaces/logs/ILogs.interface";
const LogsBoxEachItemTransactionComponentCustom = ({
  children,
  title,
}: ILogsBoxEachItemStaticBeforeAfterComponentCustom)  => {
  return (
    <div className="flex flex-col w-full">
      <LogsBoxEachItemStaticBeforeAfterComponentCustom title={title}>
        {children}
      </LogsBoxEachItemStaticBeforeAfterComponentCustom>
    </div>
  );
};

export default LogsBoxEachItemTransactionComponentCustom;
