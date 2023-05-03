import React from "react";
import { IUserInfo } from "../user/IUser.interface";

enum ETypeOfTransaction {
  op = "op",
  pa = "pa",
}
enum ETypeOfRealTransaction {
  "Remittance" = "Remittance",
  "Cash pickup" = "Cash pickup",
}
enum ETypeOfStatusTransaction {
  "successful" = "successful",
  "failed" = "failed",
}
interface ITransactionsListTable {
  results: IResultTransactionsList[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}

interface IResultTransactionsList {
  transactionCode: string;
  ip: string;
  type: keyof typeof ETypeOfTransaction;
  status: string;
  result: string;
  receiver: string;
  deleted: boolean;
  user: IUserInfo;
  referrer:IUserInfo
  id: string;
  comission:number;
  comissionType:string

}
 interface ITransactionMoreInfo {
  errorMessageResponseList: ErrorMessageResponseList[];
  remittanceResponseList:   RemittanceResponseList[];
}

 interface ErrorMessageResponseList {
  errorCode:    string[];
  errorMessage: string[];
}

 interface RemittanceResponseList {
  applicationNo:       string[];
  beneficiaryName:     string[];
  feedbackStatus:      string[];
  remitterName:        string[];
  transactionAmount:   string[];
  transactionCurrency: string[];
  transactionRefNo:    string[];
}

interface ITransactionModalInfoMoreCustom {
  onClickCancel: (value: boolean) => void;
  handleOpenModalValue: boolean;
  dataInfoMore: ITransactionMoreInfo;
}

export type {
  ITransactionsListTable,
  IResultTransactionsList,
  ITransactionMoreInfo,
  ITransactionModalInfoMoreCustom
};
export { ETypeOfTransaction, ETypeOfRealTransaction, ETypeOfStatusTransaction };
