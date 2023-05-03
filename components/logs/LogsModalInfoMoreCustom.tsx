import React from "react";
import { CloseIcon, Modal } from "../mui";
import IconButtonCustomOne from "../buttons/IconButtonCustomOne";
import { fontSize } from "../../utils/font_size";
import { handleAutoDetectItemInterfaceAndSetModule } from "../../services/LoggerService";
import CTransactionEachComponentCustom from "./logs_components/CTransactionEach";
import {
  EModulePush,
  ILogsModalInfoMoreCustomComponentCustom,
} from "../../interfaces/logs/ILogs.interface";
import CApiRateLimiterEachComponentCustom from "./logs_components/CApiRateLimiterEach";
import CRatesFeesManagementEachComponentCustom from "./logs_components/CRatesFeesManagementEach";

const LogsModalInfoMoreCustomComponentCustom = ({
  onClickCancel,
  dataInfoMore,
  handleOpenModalValue,
}: ILogsModalInfoMoreCustomComponentCustom) => {
  const handleEachItem = () => {
    if (
      Array.isArray(handleAutoDetectItemInterfaceAndSetModule(dataInfoMore))
    ) {
      return (handleAutoDetectItemInterfaceAndSetModule(dataInfoMore) as any).map(
        (item:any) => {
          return {
            cTransaction: () => CTransactionEachComponentCustom([item.data]),
            cApiRateLimiter: () => CApiRateLimiterEachComponentCustom([item.data]),
            cRatesFeesManagement: ()=> CRatesFeesManagementEachComponentCustom([item.data]),
            null: () => <p>Null</p>,
          }[item.typeModuleComponent as keyof typeof EModulePush]();
        }
      );
    } else {
      return <p>Not Have Item</p>;
    }
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
      <div className="bg-nsWhite1 border border-nsSin1 border-solid w-[80%] overflow-auto h-[90%] rounded-nsMd  relative">
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
          <p className="m-0 font-bold">Logs Full Detail</p>
        </div>
        <div className="flex py-[50px] flex-col items-center justify-center w-full">
          {handleEachItem()}
        </div>
      </div>
    </Modal>
  );
};

export default LogsModalInfoMoreCustomComponentCustom;
