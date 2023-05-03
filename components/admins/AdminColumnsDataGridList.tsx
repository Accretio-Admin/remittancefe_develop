import AdminRowItemUserAssignedLandBankComponent from "./AdminRowItemUserAssignedLandBank";
import AdminRowItemUserEditUserComponent from "./AdminRowItemUserEditUser";
import AdminRowItemUserLockAndUnLockComponent from "./AdminRowItemUserLockAndUnLock";
import { GridColDef, GridRenderCellParams } from "../mui/index";
import UserAccessGuardComponentComponent from "../customs/UserAccessGuardComponent";
import { LocalStorageAuthService } from "../../services/LocalStorageService";
import { EHeaderColumUser } from "../../interfaces/table_datagrid/ITableDataGrid.interface";
const AdminColumnsDataGridList: GridColDef[] = [
  {
    field: "nameColum",
    headerAlign: "center",
    headerName: EHeaderColumUser.Name,
    flex: 1,
    disableColumnMenu: true,
  },
  {
    headerAlign: "center",
    field: "assignedColum",
    headerName: "Assigned",
    flex: 1,
    hideSortIcons: true,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params: GridRenderCellParams<Date>) => (
      <UserAccessGuardComponentComponent
        showOrHidden={
          LocalStorageAuthService().getUserAccessLevels().users.listing.assignee
        }
      >
        <AdminRowItemUserAssignedLandBankComponent
          emailUser={params.row.emailColum} idUser={params.row.idColum}
          valueBoolean={params.row.assignedColum}
        />
      </UserAccessGuardComponentComponent>
    ),
  },
  {
    headerAlign: "center",
    field: "roleColum",
    headerName: EHeaderColumUser.Role,
    flex: 1,
    disableColumnMenu: true,
  },
  {
    headerAlign: "center",
    field: "emailColum",
    headerName: EHeaderColumUser.Email,
    flex: 1,
    disableColumnMenu: true,
  },
  {
    field: "actionsColum",
    headerAlign: "center",
    hideSortIcons: true,
    sortable: false,
    disableColumnMenu: true,
    headerName: EHeaderColumUser.Actions,
    flex: 1,
    renderCell: (params: GridRenderCellParams<Date>) => (
      <div className="flex">
        <UserAccessGuardComponentComponent
          showOrHidden={
            LocalStorageAuthService().getUserAccessLevels().users.listing.lock
          }
        >
          <AdminRowItemUserLockAndUnLockComponent
            valueLockUnLock={params.row.lockedColum}
            valueIdUser={params.row.idColum}
            valueEmailUser={params.row.emailColum}
          />
        </UserAccessGuardComponentComponent>
        <UserAccessGuardComponentComponent
          showOrHidden={
            LocalStorageAuthService().getUserAccessLevels().users.listing.edit
              .main
          }
        >
          <AdminRowItemUserEditUserComponent emailUser={params.row.emailColum} idUser={params.row.idColum} />
        </UserAccessGuardComponentComponent>
      </div>
    ),
  },
];
export { AdminColumnsDataGridList };
