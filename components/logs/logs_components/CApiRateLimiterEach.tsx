import React from "react";
import {
  IApiRateLimiterEachItemModal,
  ILogsEachItemMain,
} from "../../../interfaces/logs/ILogs.interface";
import { IConfigAPIRateLimiter } from "../../../interfaces/configs/IConfigTransaction.interface";
import LogsEachItemModalComponentCustom from "../LogsEachItemModal";
import LogsBoxEachItemTransactionComponentCustom from "./LogsBoxEachItemTransaction";

const CApiRateLimiterEachComponentCustom = (
  data: IApiRateLimiterEachItemModal[]
) => {
  const eachItemCTransaction = ({
    infoAfter,
    infoBefore,
    index,
    lengthArray,
  }: ILogsEachItemMain<IConfigAPIRateLimiter>) => {
    return (
      <>
        <LogsBoxEachItemTransactionComponentCustom title={infoBefore.name}>
          <>
            <LogsEachItemModalComponentCustom
              desc={infoBefore.dataBefore.callPerSecond.toString()}
              index={index}
              nameLabel={"Call Per Second"}
              lengthArray={lengthArray}
            />
            <LogsEachItemModalComponentCustom
              desc={ infoBefore.dataBefore.dailyLimit.toString()}
              index={index}
              nameLabel={"Daily Limit"}
              lengthArray={lengthArray}
            />
            <LogsEachItemModalComponentCustom
              desc={infoBefore.dataBefore.totalNumber.toString()}
              index={index}
              nameLabel={"Total Number"}
              lengthArray={lengthArray}
            />
          </>
        </LogsBoxEachItemTransactionComponentCustom>
        <LogsBoxEachItemTransactionComponentCustom title={infoAfter.name}>
          <>
          <LogsEachItemModalComponentCustom
              desc={infoAfter.dataAfter.callPerSecond.toString()}
              index={index}
              nameLabel={"Call Per Second"}
              lengthArray={lengthArray}
            />
            <LogsEachItemModalComponentCustom
              desc={ infoAfter.dataAfter.dailyLimit.toString()}
              index={index}
              nameLabel={"Daily Limit"}
              lengthArray={lengthArray}
            />
            <LogsEachItemModalComponentCustom
              desc={infoAfter.dataAfter.totalNumber.toString()}
              index={index}
              nameLabel={"Total Number"}
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

export default CApiRateLimiterEachComponentCustom;
