import { ERole } from "../axios/IAxios.interface";

export enum EUserLockUnlock {
  lock = "lock",
  unlock = "unlock",
}
type TUserSelectLockUnlock = {
  select: keyof typeof EUserLockUnlock;
};

export interface IUser {
  user: IUserInfo;
  tokens: ITokens;
}

export interface ITokens {
  access: IAccess;
  refresh: IAccess;
}

export interface IAccess {
  token: string;
  expires: Date;
}

export interface IUserInfo {
  locked: number | keyof typeof EUserLockUnlock;
  deleted: boolean;
  role: keyof typeof ERole;
  isEmailVerified: boolean;
  name: string;
  email: string;
  id: string;
  accessLevels: IUserAccessLevels;
  referrer:string;
}
export interface IUserAccessLevels {
  role: string;
  accessLevel: IUserAccessLevel;
  deleted: boolean;
  id: string;
}
export interface IUserAccessLevel {
  projects: string[];
  users: IUsersAccessLevelUsers;
  transactions: IUsersAccessLevelTransaction;
  rateLimiter: IUsersAccessLevelRateLimiter;
  configs: IUsersAccessLevelConfigs;
  smspanel: IUsersAccessLevelConfigs;
  logs: IUsersAccessLevelConfigs;
}

interface IUsersAccessLevelConfigs {
  main: boolean;
}
interface IUsersAccessLevelTransaction {
   main: boolean;
  listing: IUsersAccessLevelTransactionsListing;
}
interface IUsersAccessLevelTransactionsListing {
    cashPickup: boolean;
    remittance: boolean;
}
interface IUsersAccessLevelRateLimiter {
  main: boolean;
  listing: IUsersAccessLevelRateLimiterListing;
}

interface IUsersAccessLevelRateLimiterListing {
  delete: IUsersAccessLevelConfigs;
  add: IUsersAccessLevelConfigs;
}

interface IUsersAccessLevelUsers {
  main: boolean;
  listing: IUsersAccessLevelUsersListing;
}

interface IUsersAccessLevelUsersListing {
  assignee: boolean;
  lock: boolean;
  edit: IUsersAccessLevelEdit;
  add: IUsersAccessLevelAdd;
}

interface IUsersAccessLevelAdd {
  main: boolean;
  role: boolean;
}

interface IUsersAccessLevelEdit {
  main: boolean;
  name: boolean;
  email: boolean;
  lock: boolean;
  password: boolean;
  role: boolean;
  credentialAssignment: boolean;
  ipAssignment: boolean;
}

export interface ICreateUser {
  role: string;
  name: string;
  email: string;
  password: string;
}
export interface IUpdateUser {
  name: string;
  email: string;
  password?: string;
  locked: number;
  role: string;
}
export interface IUpdateUnlockAndLockUser {
  locked: number;
}

export interface IUpdateAssignIpUser {
  limitType: string;
  value: string;
}
export interface IAddAssignIpUser {
  userId: string;
  limitType: string;
  value: string;
}
export interface IAdminRowItemUserLockAndUnLock {
  valueLockUnLock: number;
  valueIdUser: string;
  valueEmailUser: string;
}
export interface UserLimitationBulk {
  deleted:   boolean;
  userId:    string;
  limitType: string;
  value:     string;
  id:        string;
}

export type { TUserSelectLockUnlock };
