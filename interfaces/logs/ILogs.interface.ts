import {
  IConfigAPIRateLimiter,
  IConfigRatesFeesManagement,
  IConfigTransaction,
} from "../configs/IConfigTransaction.interface";
import { IUser } from "../user/IUser.interface";

interface ILogs {
  enterTime: string;
  enterDate: string;
  exitTime: string;
  exitDate: string;
  ip: string;
  changes: Array<any>;
  duration: number;
  deleted: boolean;
  id: string;
}
interface IUpdateLogs {
  duration?: number;
  enterTime?: string;
  enterDate?: string;
  exitTime?: string;
  exitDate?: string;
  changes?: Array<any>;
}
interface ILogsTable {
  results: ILogsResult[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}

interface ILogsResult {
  enterTime: string;
  enterDate: string;
  exitTime: string;
  exitDate: string;
  ip: string;
  changes: Array<any>;
  duration: number;
  deleted: boolean;
  id: string;
}
interface ILogInput {
  name: string;
  email: string;
  password: string;
  locked: number;
  role: string;
  date: string;
}
interface ILogInputSave {
  after: ILogInput;
  before: ILogInput;
}
// For Logs Modal
enum EModulePush {
  cTransaction = "cTransaction",
  cApiRateLimiter = "cApiRateLimiter",
  cRatesFeesManagement = "cRatesFeesManagement",
}
interface IAfterAndBeforeLogsSaver<A, B> extends IUser {
  after: A;
  before: B;
}
interface ICTransactionEachItemModal
  extends IAfterAndBeforeLogsSaver<IConfigTransaction, IConfigTransaction> {}
interface IApiRateLimiterEachItemModal
  extends IAfterAndBeforeLogsSaver<
    IConfigAPIRateLimiter,
    IConfigAPIRateLimiter
  > {}
interface IRatesFeesManagementEachItemModal
  extends IAfterAndBeforeLogsSaver<
    IConfigRatesFeesManagement,
    IConfigRatesFeesManagement
  > {}
interface ICApiRateLimiterEachItemModal {
  before: IConfigAPIRateLimiter;
  after: IConfigAPIRateLimiter;
}
interface ILogsEachItemModalFindInterface {
  cTransaction: ICTransactionEachItemModal;
  cApiRateLimiter: ICApiRateLimiterEachItemModal;
}
interface ILogsEachItemModalComponentCustom {
  nameLabel: string;
  desc: string;
  index: number;
  lengthArray: number;
}
interface ILogsBoxEachItemStaticBeforeAfterComponentCustom {
  title: string;
  children: JSX.Element;
}
interface ILogsModalInfoMoreCustomComponentCustom {
  onClickCancel: (value: boolean) => void;
  dataInfoMore: any;
  handleOpenModalValue: boolean;
}
interface ILogsEachItemMain<T> {
  infoAfter: {
    name: string;
    dataAfter: T;
  };
  infoBefore: {
    name: string;
    dataBefore: T;
  };
  index: number;
  lengthArray: number;
}
// End For Logs Modal
export type {
  ILogs,
  IUpdateLogs,
  ILogsTable,
  ILogsResult,
  ILogInputSave,
  ICTransactionEachItemModal,
  ILogsEachItemModalFindInterface,
  ILogsEachItemModalComponentCustom,
  ILogsBoxEachItemStaticBeforeAfterComponentCustom,
  ILogsModalInfoMoreCustomComponentCustom,
  ICApiRateLimiterEachItemModal,
  ILogsEachItemMain,
  IApiRateLimiterEachItemModal,
  IRatesFeesManagementEachItemModal,
};
export { EModulePush };
