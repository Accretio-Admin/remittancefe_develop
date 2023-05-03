import { DataGridProps, GridColDef, GridRowsProp } from "../../components/mui";
import { IConvertStringSortTableApi } from "../customs/ICustoms.interface";

enum EListenerArgNames {
  sortSize = "sortSize",
  pageSizeRow = "pageSizeRow",
  pageSizePages = "pageSizePages",
  filtering = "filtering",
}

enum ETypeInputFilter {
  text = "text",
  select = "select",
  email = "email",
}
enum EModeInput {
  basic = "basic",
  select = "select",
}
enum EModeInputTypeSection {
  user = "user",
  transaction = "transaction",
}
enum EModeRowFirstTable {
  users = "users",
  null = "null",
}


enum EHeaderColumUser {
  Name = "Name",
  Assigned = "Assigned",
  Role = "Role",
  Email = "Email",
  Id = "Id",
  IsEmailVerified = "IsEmailVerified",
  Locked = "Locked",
  Deleted = "Deleted",
  AccessLevels = "AccessLevels",
  Actions = "Actions",
}
enum EHeaderColumTransactions {
  Ip = "Ip",
  Id = "Id",
  Result = "Result",
  Status = "Status",
  Deleted = "Deleted",
  "Transaction Code" = "Transaction ID",
  "Type of Transaction" = "Type of Transaction",
  Email = "Email",
  Receiver = "Receiver",
  commission="Commission"
}

enum EHeaderColumLogs {
  enterTime="Enter Time",
  enterDate="Enter Date",
  exitTime="Exit Time",
  exitDate="Exit Date",
  ip="ip",
  duration="duration",
}

enum EHeaderColumUserIpWhiteList {
  value = "Ip",
  Actions = "Actions",
}

interface IValueHandleOnListener {
  value: number | string;
  name: keyof typeof EListenerArgNames;
}
interface ITableDataGridCustomArgLoadTableData {
  pageSize: number;
  page: number;
  sortingValue: string;
  filterValue: string;
}
interface ITableDataGridCustomSetAutomaticLoadTableData {
  setAutomaticLoadTableData: ({
    pageSize,
    page,
    sortingValue,
  }: ITableDataGridCustomArgLoadTableData) => void;
}

interface ITableDataGridCustomYupValidator<TIV> {
  initialStateFormFilterValue: TIV;
  yupValidatorFormFilter: any;
}
interface ITableDataGridCustomSortAndFilterDefault {
  sortValueDefault: string;
  filterValueDefault: string;
  sortValueMainDefault: string;
  filterValueMainDefault:string;
}
interface ITableDataGridCustom<TIV>
  extends ITableDataGridCustomSetAutomaticLoadTableData,
    ITableDataGridCustomDlExcel,
    ITableDataGridCustomSortAndFilterDefault,
    ITableDataGridCustomYupValidator<TIV> {
  componentActionFooter?: JSX.Element;
  columns: GridColDef[];
  rows: GridRowsProp;
  pageSize: number;
  rowCountState: number;
  loadingTable: boolean;
  page: number;
  columnsSortValueDefault: IConvertStringSortTableApi[];
  setSortValueDefault: (value: string) => void;
  setFilterValueDefault: (value: string) => void;
  setPageSize: (value: number) => void;
  setPage: (value: number) => void;
  settingsListFilterColumn: ITableDataGridFilterCustomListItemFilter[];
  modeRowFirstTable?: keyof typeof EModeRowFirstTable;
  removeBackgroundMainTableDataGrid?:boolean;
  removePaddingContainerTableDataGridParent?:boolean;
}
interface ITableDataGridCustomDlExcel extends ITableDataGridCustomSortAndFilterDefault {
  infoDlExcel:{
    nameColumnExcel:Array<string>,
    nameAddressExcelDl:string,
  }
}
interface ITableDataGridStyledCustom extends DataGridProps {
  modeRowFirstTable: keyof typeof EModeRowFirstTable;
  removeBackgroundMainTableDataGrid:boolean;
  removePaddingContainerTableDataGridParent:boolean;
}

interface ITableDataGridFilterCustom<TIV>
  extends ITableDataGridCustomSetAutomaticLoadTableData,
    ITableDataGridCustomArgLoadTableData,
    ITableDataGridCustomYupValidator<TIV> {
  settingsListFilterColumn: ITableDataGridFilterCustomListItemFilter[];
  setFilterValueDefault: (value: string) => void;
  loadingTable: boolean;
  filterValueMainDefault:string;
}
interface ITableDataGridFilterCustomListItemFilter {
  name: string;
  valueSelect: string;
  typeInput: keyof typeof ETypeInputFilter;
  nameInput: string;
  idInput: string;
  placeholderInput: string;
  typeFormatValue: string;
  modeInput: keyof typeof EModeInput;
  ModeInputTypeSection?: keyof typeof EModeInputTypeSection;
}
interface ITableDataGridFilterInputAutoLoad {
  infoArrayFilter: ITableDataGridFilterCustomListItemFilter[];
  valueSelectFilterColum: string;
  formikProps: any;
}
interface ITableDataGridPaginationCustom {
  isDisabled: boolean;
  children?: JSX.Element;
}
interface ITableDataGridMenuFilterStyledCustom {
  widthContainer:number
}

export type {
  ITableDataGridCustom,
  ITableDataGridPaginationCustom,
  IValueHandleOnListener,
  ITableDataGridFilterCustom,
  ITableDataGridFilterCustomListItemFilter,
  ITableDataGridFilterInputAutoLoad,
  ITableDataGridCustomArgLoadTableData,
  ITableDataGridStyledCustom,
  ITableDataGridCustomDlExcel,
  ITableDataGridMenuFilterStyledCustom
};
export {
  EListenerArgNames,
  EModeInput,
  EModeInputTypeSection,
  EModeRowFirstTable,
  EHeaderColumUser,
  EHeaderColumTransactions,
  EHeaderColumUserIpWhiteList,
  EHeaderColumLogs
};
