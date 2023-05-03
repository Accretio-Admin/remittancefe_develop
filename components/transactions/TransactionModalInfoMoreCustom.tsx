import React from "react";
import { fontSize } from "../../utils/font_size";
import IconButtonCustomOne from "../buttons/IconButtonCustomOne";
import { CloseIcon, Modal } from "../mui";
import { ITransactionModalInfoMoreCustom } from "../../interfaces/transactions/ITransactions.interface";
const TransactionModalInfoMoreCustomComponent = ({
  onClickCancel,
  dataInfoMore,
  handleOpenModalValue = false,
}: ITransactionModalInfoMoreCustom) => {
  const loopInfoTransaction = () => {
    return Object.entries(dataInfoMore.remittanceResponseList[0]).map(
      (item) => {
        return {
          name: item[0],
          value: item[1][0],
        };
      }
    );
  };
  const boxItemShow = () => {
    if (
      ["010", "008"].includes(
        dataInfoMore.errorMessageResponseList[0].errorCode[0]
      )
    ) {
      return <p>{dataInfoMore.errorMessageResponseList[0].errorMessage[0]}</p>;
    } else {
      return (
        <>
          <div className="flex flex-row items-center justify-between w-full">
            {loopInfoTransaction().map((item, index) => {
              return (
                <p
                  className={`capitalize w-full ${
                    handleClassItemFirstAndLastItem(
                      index,
                      "text-left",
                      "text-right",
                      "text-center"
                    ).model
                  }  font-medium`}
                  key={index}
                >
                  {item.name}
                </p>
              );
            })}
          </div>
          <div className="w-full  bg-nsEbb1 h-[1px]  line-nav-section" />
          <div className="flex flex-row items-center justify-between mx-2 w-full">
            {loopInfoTransaction().map((item, index) => {
              return (
                <p
                  className={`capitalize w-full font-light text-sm ${
                    handleClassItemFirstAndLastItem(
                      index,
                      "text-left",
                      "text-right",
                      "text-center"
                    ).model
                  }`}
                  key={index}
                >
                  {item.value}
                </p>
              );
            })}
          </div>
        </>
      );
    }
  };
  const handleClassItemFirstAndLastItem = (
    index: number,
    first: string,
    last: string,
    other: string
  ) => {
    return {
      model:
        index == 0
          ? first
          : loopInfoTransaction().length - 1 == index
          ? last
          : other,
    };
  };
  return (
    <Modal
      open={handleOpenModalValue}
      component="div"
      disableScrollLock={true}
      onClose={() => onClickCancel(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex items-center justify-center "
    >
      <div className="bg-nsWhite1 border border-nsSin1 border-solid w-[80%] h-[250px] rounded-nsMd  relative">
        <div className=" absolute right-2 top-2">
          <IconButtonCustomOne
            onClick={() => onClickCancel(false)}
            colorIconCustom="nsBlack1"
            aria-label="Close modal"
          >
            <CloseIcon sx={{ fontSize: fontSize["3xl"] }} />
          </IconButtonCustomOne>
        </div>
        <div className=" absolute left-[30px] top-[25px]">
          <p className="m-0 font-bold">Transaction Full Detail</p>
        </div>
        <div className="flex h-[inherit] flex-col items-center justify-center py-2 px-7 w-full">
          {boxItemShow()}
        </div>
      </div>
    </Modal>
  );
};

export default TransactionModalInfoMoreCustomComponent;
