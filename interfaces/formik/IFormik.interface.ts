import { EUserLockUnlock } from "../user/IUser.interface";

interface IFormAdminAdd {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  role: string;
}



interface IFormAuthRegister {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}
interface IFormAuthRegisterInCodeInitializer {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  codeSecret: string;
}
interface IFormAdminEditUser {
  name: string;
  email: string;
  password: string;
  locked: number | keyof typeof EUserLockUnlock;
  role: string;
}
interface IFormAdminAssignIpUser {
  value: string;
  id: string;
}

interface IFormAuthResetPassword {
  password: string;
  passwordConfirmation: string;
}
interface IFormAuthForgotPassword {
  email: string;
}
interface IFormApiGroupManagementCreateName {
  name: string;
}
interface IFormApiGroupManagementCreateEndpoints {
  endpoints: string;
}
interface IFormAuthCodeSecret {
  codeSecret: string;
}
interface IFormAuthLoginRemember {
  email: string;
  password: string;
}

interface IFormFilterUserTableDataGridCustom {
  email: string;
  name: string;
  role: string;
}
interface IFormAdminIpWhiteListTableDataGridCustom {
  value: string;
}
interface IFormFilterTransactionsTableDataGridCustom {
  email: string;
  transactionCode: string;
  type: string;
  status: string;
}
interface IFormFilterLogsTableDataGridCustom {
  enterTime: string;
  enterDate: string;
  exitTime: string;
  exitDate: string;
  ip: string;
  duration: string;
}
export type {
  IFormAdminAdd,
  IFormAuthLoginRemember,
  IFormAuthRegister,
  IFormAuthForgotPassword,
  IFormAuthCodeSecret,
  IFormAuthResetPassword,
  IFormAdminEditUser,
  IFormAuthRegisterInCodeInitializer,
  IFormFilterUserTableDataGridCustom,
  IFormFilterTransactionsTableDataGridCustom,
  IFormAdminIpWhiteListTableDataGridCustom,
  IFormAdminAssignIpUser,
  IFormFilterLogsTableDataGridCustom,
  IFormApiGroupManagementCreateName,
  IFormApiGroupManagementCreateEndpoints
};
