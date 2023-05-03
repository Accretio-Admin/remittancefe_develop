import { SnackbarOrigin } from "../../components/mui/index";
import { IAdminEditInfoAssignIpUser } from "../admins/IAdmins.interface";

interface ILoadingFullPage {
  active: boolean;
  colorBackDrop?: string;
}
interface ISnackBarMsg {
  msg: string;
  openMsg: boolean;
  timeAutoHide: number;
  severity: "error" | "info" | "warning" | "success";
  anchorOriginPositions?: SnackbarOrigin;
}
interface IAdminAssignIpUser extends IAdminEditInfoAssignIpUser {
  modeEdit?: boolean;
  updateTableAssignIpUser?:boolean;
}

export type { ISnackBarMsg, ILoadingFullPage, IAdminAssignIpUser };
