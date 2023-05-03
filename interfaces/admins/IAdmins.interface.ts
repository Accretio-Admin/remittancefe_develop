import { IUserInfo } from "../user/IUser.interface";

interface IAdminAssignIpUserComponent {
  idQuery: string;
  callBackUpdateTable: () => void;
}


interface IAdminTableIpWhiteList {
  results: IAdminTableIpWhiteListResult[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}

interface IAdminTableIpWhiteListResult {
  deleted: boolean;
  limitType: string;
  value: string;
  userId: string;
  id: string;
}
interface IAdminEditInfoAssignIpUser {
  idColum: string;
  limitTypeColum: string;
  valueColum: string;
}
export type {
  IAdminAssignIpUserComponent,
  IAdminTableIpWhiteList,
  IAdminEditInfoAssignIpUser,
};
