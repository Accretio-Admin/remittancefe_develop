interface IConfigs {
  transaction: IConfigTransaction;
  apiRateLimiter: IConfigAPIRateLimiter;
  ratesFeesManagement: IConfigRatesFeesManagement;
  id: string;
}

interface IConfigTransactionUpdate {
  transaction: IConfigTransaction;
}

interface IConfigAPIRateLimiter {
  totalNumber: number;
  callPerSecond: number;
  dailyLimit: number;
}

interface IConfigRatesFeesManagement {
  percentage: Markup;
  markup: Markup;
}

interface Markup {
  value: number;
  active: boolean;
}

interface IConfigTransaction {
  frequency: Frequency;
  transactionAmount: TransactionAmount;
}

interface Frequency {
  duplication: boolean;
  cutoffTime: CutoffTime;
}

interface CutoffTime {
  cutoffStartTime: string;
  cutoffEndTime: string;
}

interface TransactionAmount {
  transactionAmountLimit: TransactionAmountLimit;
}

interface TransactionAmountLimit {
  perTransactionAmount: number;
  transactionTotalAmount: number;
  perDayTransactionAmount:number;
}

 interface IConfigApiGroupsManagements {
  results:      IConfigApiGroupsManagementResult[];
  page:         number;
  limit:        number;
  totalPages:   number;
  totalResults: number;
}

 interface IConfigApiGroupsManagementResult {
  name:      string;
  endpoints: string[];
  deleted:   boolean;
  id:        string;
}
interface IConfigApiGroupsManagementCreate {
  name:string;
  endpoints:Array<string>
}
interface IConfigApiGroupsManagementUpdate {
  name?:      string;
  endpoints?: Array<string>;
}

// New---------------------------
enum EConfigTransactionDuplication {
  "allowed" = "allowed",
  "notAllowed" = "notAllowed",
}

export type {
  IConfigs,
  IConfigTransaction,
  IConfigTransactionUpdate,
  IConfigAPIRateLimiter,
  IConfigRatesFeesManagement,
  IConfigApiGroupsManagements,
  IConfigApiGroupsManagementResult,
  IConfigApiGroupsManagementCreate,
  IConfigApiGroupsManagementUpdate
};
export { EConfigTransactionDuplication };
