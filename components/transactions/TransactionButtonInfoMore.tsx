import React, { useState } from "react";
import TransactionModalInfoMoreCustomComponent from "./TransactionModalInfoMoreCustom";
import IconButtonCustomOne from "../buttons/IconButtonCustomOne";
import { FullscreenIcon } from "../mui";
import { ITransactionMoreInfo } from "../../interfaces/transactions/ITransactions.interface";

const TransactionButtonInfoMoreComponentCustom = ({
  infoMore,
}: {
  infoMore: string;
}) => {
  const [showOrOffModal, setShowOrOffModal] = useState<boolean>(false);
  const [dataModal, setDataModal] = useState<ITransactionMoreInfo>({
    errorMessageResponseList: [
      {
        errorCode: [""],
        errorMessage: [""],
      },
    ],
    remittanceResponseList: [
      {
        applicationNo: [""],
        beneficiaryName: [""],
        feedbackStatus: [""],
        remitterName: [""],
        transactionAmount: [""],
        transactionCurrency: [""],
        transactionRefNo: [""],
      },
    ],
  });
  return (
    <>
      <IconButtonCustomOne
        onClick={() => {
          setShowOrOffModal(true);
          setDataModal(JSON.parse(infoMore));
        }}
        aria-label="more info transaction"
      >
        <FullscreenIcon />
      </IconButtonCustomOne>
      <TransactionModalInfoMoreCustomComponent
        onClickCancel={setShowOrOffModal}
        handleOpenModalValue={showOrOffModal}
        dataInfoMore={dataModal}
      />
    </>
  );
};

export default TransactionButtonInfoMoreComponentCustom;
