import React from "react";
import { ICTransactionEachItemModal, ILogsEachItemMain } from "../../../interfaces/logs/ILogs.interface";
import { IConfigTransaction } from "../../../interfaces/configs/IConfigTransaction.interface";
import moment from "moment";
import LogsEachItemModalComponentCustom from "../LogsEachItemModal";
import LogsBoxEachItemTransactionComponentCustom from "./LogsBoxEachItemTransaction";

const CTransactionEachComponentCustom = (
  data: ICTransactionEachItemModal[]
) => {
  const eachItemCTransaction = ({
    infoAfter,
    infoBefore,
    index,
    lengthArray,
  }: ILogsEachItemMain<IConfigTransaction>) => {
    return (
      <>
        <LogsBoxEachItemTransactionComponentCustom title={infoBefore.name}>
          <>
            <LogsEachItemModalComponentCustom
              desc={
                infoBefore.dataBefore.frequency.duplication
                  ? "Active"
                  : "Not Active"
              }
              index={index}
              nameLabel={"Duplication"}
              lengthArray={lengthArray}
            />
            <LogsEachItemModalComponentCustom
              desc={moment(
                infoBefore.dataBefore.frequency.cutoffTime.cutoffStartTime
              ).format("LTS")}
              index={index}
              nameLabel={"Cutoff Start Time"}
              lengthArray={lengthArray}
            />
            <LogsEachItemModalComponentCustom
              desc={moment(
                infoBefore.dataBefore.frequency.cutoffTime.cutoffEndTime
              ).format("LTS")}
              index={index}
              nameLabel={"Cutoff End Time"}
              lengthArray={lengthArray}
            />
            <LogsEachItemModalComponentCustom
              desc={infoBefore.dataBefore.transactionAmount.transactionAmountLimit.perDayTransactionAmount.toString()}
              index={index}
              nameLabel={"Per Day Transaction Amount"}
              lengthArray={lengthArray}
            />
            <LogsEachItemModalComponentCustom
              desc={infoBefore.dataBefore.transactionAmount.transactionAmountLimit.perTransactionAmount.toString()}
              index={index}
              nameLabel={"Per Transaction Amount"}
              lengthArray={lengthArray}
            />
            <LogsEachItemModalComponentCustom
              desc={infoBefore.dataBefore.transactionAmount.transactionAmountLimit.transactionTotalAmount.toString()}
              index={index}
              nameLabel={"Transaction Total Amount"}
              lengthArray={lengthArray}
            />
          </>
        </LogsBoxEachItemTransactionComponentCustom>
        <LogsBoxEachItemTransactionComponentCustom title={infoAfter.name}>
          <>
            <LogsEachItemModalComponentCustom
              desc={
                infoAfter.dataAfter.frequency.duplication
                  ? "Active"
                  : "Not Active"
              }
              index={index}
              nameLabel={"Duplication"}
              lengthArray={lengthArray}
            />
            <LogsEachItemModalComponentCustom
              desc={moment(
                infoAfter.dataAfter.frequency.cutoffTime.cutoffStartTime
              ).format("LTS")}
              index={index}
              nameLabel={"Cutoff Start Time"}
              lengthArray={lengthArray}
            />
            <LogsEachItemModalComponentCustom
              desc={moment(
                infoAfter.dataAfter.frequency.cutoffTime.cutoffEndTime
              ).format("LTS")}
              index={index}
              nameLabel={"Cutoff End Time"}
              lengthArray={lengthArray}
            />
            <LogsEachItemModalComponentCustom
              desc={infoAfter.dataAfter.transactionAmount.transactionAmountLimit.perDayTransactionAmount.toString()}
              index={index}
              nameLabel={"Per Day Transaction Amount"}
              lengthArray={lengthArray}
            />
            <LogsEachItemModalComponentCustom
              desc={infoAfter.dataAfter.transactionAmount.transactionAmountLimit.perTransactionAmount.toString()}
              index={index}
              nameLabel={"Per Transaction Amount"}
              lengthArray={lengthArray}
            />
            <LogsEachItemModalComponentCustom
              desc={infoAfter.dataAfter.transactionAmount.transactionAmountLimit.transactionTotalAmount.toString()}
              index={index}
              nameLabel={"Transaction Total Amount"}
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
        {data.map(({ before, after,user }, index) => (
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

export default CTransactionEachComponentCustom;
