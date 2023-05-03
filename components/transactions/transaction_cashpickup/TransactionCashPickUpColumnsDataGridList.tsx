import { EHeaderColumTransactions } from "../../../interfaces/table_datagrid/ITableDataGrid.interface";
import { FullscreenIcon, GridColDef, GridRenderCellParams } from "../../mui";
import { TableDataGridItemColumStatusTransactionCustom } from "../TableDataGridItemColumStatusTransactionCustom";
import TransactionButtonInfoMoreComponentCustom from "../TransactionButtonInfoMore";

const TransactionCashPickUpColumnsDataGridList: GridColDef[] = [
  {
    headerAlign: "center",
    field: "transactionCodeColum",
    headerName: EHeaderColumTransactions["Transaction Code"],
    flex: 1,
    disableColumnMenu: true,
  },
  {
    field: "emailColum",
    headerAlign: "center",
    headerName: `${EHeaderColumTransactions.Email}/${EHeaderColumTransactions.Ip}`,
    flex: 1,
    disableColumnMenu: true,
  },
  {
    headerAlign: "center",
    field: "receiverColum",
    headerName: EHeaderColumTransactions.Receiver,
    flex: 1,
    disableColumnMenu: true,
  },
  {
    headerAlign: "center",
    field: "typePaymentColum",
    headerName: EHeaderColumTransactions["Type of Transaction"],
    flex: 1,
    disableColumnMenu: true,
    hideSortIcons: true,
    sortable: false,
  },
  {
    headerAlign: "center",
    field: "statusPaymentColum",
    headerName: EHeaderColumTransactions.Status,
    flex: 1,
    disableColumnMenu: true,
    renderCell: (params: GridRenderCellParams<Date>) => (
      <TableDataGridItemColumStatusTransactionCustom
        statusName={params.row.statusPaymentColum}
      />
    ),
  },
  {
    headerAlign: "center",
    field: "commissionValueColum",
    headerName: EHeaderColumTransactions.commission,
    flex: 1,
    disableColumnMenu: true,
    renderCell: (params: GridRenderCellParams<Date>) => (
      <>
        <p className="m-0 w-[30px]">{params.row.commissionValueColum}</p>
       <div className="w-[30px]">
       <TransactionButtonInfoMoreComponentCustom
          infoMore={params.row.resultTransaction}
        />
       </div>
      </>
    ),
  }
];
export { TransactionCashPickUpColumnsDataGridList };
