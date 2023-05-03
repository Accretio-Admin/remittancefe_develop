import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import moment from "moment";
import { EHeaderColumLogs } from "../../interfaces/table_datagrid/ITableDataGrid.interface";
import LogsButtonInfoMoreComponentCustom from "./LogsButtonInfoMore";
const LogsColumnsDataGridList: GridColDef[] = [
  {
    headerAlign: "center",
    field: "enterTimeColum",
    headerName: EHeaderColumLogs.enterTime,
    flex: 1,
    disableColumnMenu: true,
    renderCell: (params: GridRenderCellParams) => (
      <p>{moment(params.row.enterTimeColum).format("LTS")}</p>
    ),
  },
  {
    headerAlign: "center",
    field: "enterDateColum",
    headerName: EHeaderColumLogs.enterDate,
    flex: 1,
    disableColumnMenu: true,
    renderCell: (params: GridRenderCellParams) => (
      <p>{moment(params.row.enterDateColum).format("L")}</p>
    ),
  },
  {
    headerAlign: "center",
    field: "ipColum",
    headerName: "Ip",
    flex: 1,
    disableColumnMenu: true,
  },
  {
    headerAlign: "center",
    field: "exitTimeColum",
    headerName: EHeaderColumLogs.exitTime,
    flex: 1,
    disableColumnMenu: true,
    renderCell: (params: GridRenderCellParams) => (
      <p>{moment(params.row.exitTimeColum).format("LTS")}</p>
    ),
  },
  {
    headerAlign: "center",
    field: "exitDateColum",
    headerName: EHeaderColumLogs.exitDate,
    flex: 1,
    disableColumnMenu: true,
    renderCell: (params: GridRenderCellParams) => (
      <p>{moment(params.row.exitDateColum).format("L")}</p>
    ),
  },
  {
    headerAlign: "center",
    field: "durationColum",
    headerName: "Time spend in the dashboard",
    flex: 1,
    disableColumnMenu: true,
    renderCell: (params: GridRenderCellParams) => (
      <>
        <p>{new Date(params.row.durationColum).toISOString().slice(11, 19)}</p>        
        <LogsButtonInfoMoreComponentCustom
          infoMore={params.row.changesColum}
        />
      </>
    ),
  },
];
export { LogsColumnsDataGridList };
