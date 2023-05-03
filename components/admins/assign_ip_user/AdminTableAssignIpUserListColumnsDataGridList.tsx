import { EHeaderColumUserIpWhiteList } from "../../../interfaces/table_datagrid/ITableDataGrid.interface";
import { GridColDef, GridRenderCellParams } from "../../mui/index";
import AdminTableDeleteAssignIpUser from "./AdminTableDeleteAssignIpUser";
import AdminTableEditActionAssignIpUserComponent from "./AdminTableEditActionAssignIpUser";

const AdminTableAssignIpUserListColumnsDataGridList: GridColDef[] = [
  {
    headerAlign: "center",
    field: "valueColum",
    headerName: EHeaderColumUserIpWhiteList.value,
    flex: 1,
    disableColumnMenu: true,
  },
  {
    field: "actionsColum",
    headerAlign: "center",
    hideSortIcons: true,
    sortable: false,
    disableColumnMenu: true,
    headerName: EHeaderColumUserIpWhiteList.Actions,
    flex: 1,
    renderCell: (params: GridRenderCellParams<Date>) => (
      <div className="flex">
        <AdminTableDeleteAssignIpUser idIpUser={params.row.idColum} />
        <AdminTableEditActionAssignIpUserComponent
          {...params.row}
        />
      </div>
    ),
  },
];
export { AdminTableAssignIpUserListColumnsDataGridList };
