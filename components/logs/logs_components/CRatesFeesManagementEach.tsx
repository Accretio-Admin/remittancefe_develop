import React from "react";
import {
  ILogsEachItemMain,
  IRatesFeesManagementEachItemModal,
} from "../../../interfaces/logs/ILogs.interface";
import { IConfigRatesFeesManagement } from "../../../interfaces/configs/IConfigTransaction.interface";
import LogsEachItemModalComponentCustom from "../LogsEachItemModal";
import LogsBoxEachItemTransactionComponentCustom from "./LogsBoxEachItemTransaction";

const CRatesFeesManagementEachComponentCustom = (
  data: IRatesFeesManagementEachItemModal[]
) => {
  const eachItemCTransaction = ({
    infoAfter,
    infoBefore,
    index,
    lengthArray,
  }: ILogsEachItemMain<IConfigRatesFeesManagement>) => {
    return (
      <>
        <LogsBoxEachItemTransactionComponentCustom title={infoBefore.name}>
          <>
            <LogsEachItemModalComponentCustom
              desc={infoBefore.dataBefore.percentage.value.toString()}
              index={index}
              nameLabel={"Call Per Second Value"}
              lengthArray={lengthArray}
            />
            <LogsEachItemModalComponentCustom
              desc={infoBefore.dataBefore.percentage.active ? "Active":"notActive"}
              index={index}
              nameLabel={"Status Call Per Second"}
              lengthArray={lengthArray}
            />
            <LogsEachItemModalComponentCustom
              desc={infoBefore.dataBefore.markup.value.toString()}
              index={index}
              nameLabel={"Call Per Second Value"}
              lengthArray={lengthArray}
            />
            <LogsEachItemModalComponentCustom
              desc={infoBefore.dataBefore.markup.active ? "Active":"notActive"}
              index={index}
              nameLabel={"Status Call Per Second"}
              lengthArray={lengthArray}
            />
          </>
        </LogsBoxEachItemTransactionComponentCustom>
        <LogsBoxEachItemTransactionComponentCustom title={infoAfter.name}>
          <>
          <LogsEachItemModalComponentCustom
              desc={infoAfter.dataAfter.percentage.value.toString()}
              index={index}
              nameLabel={"Call Per Second Value"}
              lengthArray={lengthArray}
            />
            <LogsEachItemModalComponentCustom
              desc={infoAfter.dataAfter.percentage.active ? "Active":"notActive"}
              index={index}
              nameLabel={"Status Call Per Second"}
              lengthArray={lengthArray}
            />
            <LogsEachItemModalComponentCustom
              desc={infoAfter.dataAfter.markup.value.toString()}
              index={index}
              nameLabel={"Call Per Second Value"}
              lengthArray={lengthArray}
            />
            <LogsEachItemModalComponentCustom
              desc={infoAfter.dataAfter.markup.active ? "Active":"notActive"}
              index={index}
              nameLabel={"Status Call Per Second"}
              lengthArray={lengthArray}
            />
          </>
        </LogsBoxEachItemTransactionComponentCustom>
        <div className="w-full  bg-nsEbb1 h-[1px]  line-nav-section" />
      </>
    );
  };
  return (
    <>
      <div className="flex flex-col items-center justify-between w-full">
        {data.map(({ before, after , user }, index) => (
          <>
           <p className="underline font-bold text-right cursor-pointer px-[20px] w-full">{user.email}</p>
            {eachItemCTransaction({
              index,
              lengthArray: data.length,
              infoAfter: { dataAfter: after, name: "After" },
              infoBefore: { dataBefore: before, name: "Before" },
            })}
          </>
        ))}
      </div>
    </>
  );
};

export default CRatesFeesManagementEachComponentCustom;
