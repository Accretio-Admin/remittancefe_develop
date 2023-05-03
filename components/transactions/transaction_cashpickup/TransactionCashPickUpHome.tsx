import React, { useEffect, useState } from "react";
import TableDataGridCustomComponent from "../../table_datagrid/TableDataGridCustom";
import { TransactionCashPickUpColumnsDataGridList } from "./TransactionCashPickUpColumnsDataGridList";
import { GridRowsProp } from "../../mui";
import { ESorting } from "../../../interfaces/customs/ICustoms.interface";
import { EHeaderColumTransactions, ITableDataGridFilterCustomListItemFilter } from "../../../interfaces/table_datagrid/ITableDataGrid.interface";
import { ITransactionsListTable } from "../../../interfaces/transactions/ITransactions.interface";
import { ApiService } from "../../../services/ApiService";
import { IFormFilterTransactionsTableDataGridCustom } from "../../../interfaces/formik/IFormik.interface";
import { FormFilterTransactionsSchema } from "../../../utils/yup";
import { ConvertNameTypeTransaction } from "../../../utils/other/ConvertNameTypeTransaction";
const TransactionCashPickUpHome = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [loadingTable, setLoadingTable] = useState<boolean>(true);
  const [rowCountState, setRowCountState] = useState<number>(0);
  const tempSortDef: string =
    "user.email:asc,transactionCode:desc,type:asc,status:asc,receiver:asc,comission:asc";
  const tempFilterDef: string = "filter=type|stg=PA";
  const [sortValueDefault, setSortValueDefault] = useState<string>(tempSortDef);
  const [filterValueDefault, setFilterValueDefault] =
    useState<string>(tempFilterDef);
  const [initialStateFormFilterValue, setInitialStateFormFilterValue] =
    useState<IFormFilterTransactionsTableDataGridCustom>({
      email: "",
      status: "",
      transactionCode: "",
      type: "",
    });
    let listSortingColum = [
      {
        field: "transactionCodeColum",
        sort: ESorting.desc,
        name: "transactionCode",
      },
      {
        field: "emailColum",
        sort: ESorting.asc,
        name: "user.email",
      },
      {
        field: "receiverColum",
        sort: ESorting.asc,
        name: "receiver",
      },
      {
        field: "typePaymentColum",
        sort: ESorting.asc,
        name: "type",
      },
      {
        field: "statusPaymentColum",
        sort: ESorting.asc,
        name: "status",
      },
      {
        field: "commissionValueColum",
        sort: ESorting.asc,
        name: "comission",
      },
    ];
  let settingsListFilterColumn: ITableDataGridFilterCustomListItemFilter[] = [
    {
      name: EHeaderColumTransactions.Email,
      valueSelect: "emailColum",
      typeInput: "email",
      nameInput: "email",
      modeInput: "basic",
      idInput: "email",
      placeholderInput: "Enter your email",
      typeFormatValue: "stg",
    },
    {
      name: EHeaderColumTransactions["Transaction Code"],
      valueSelect: "transactionCodeColum",
      typeInput: "text",
      modeInput: "basic",
      nameInput: "transactionCode",
      idInput: "transactionCode",
      placeholderInput: "Enter your Transaction ID",
      typeFormatValue: "stg",
    },
    {
      name: EHeaderColumTransactions.commission,
      valueSelect: "commissionValueColum",
      typeInput: "text",
      modeInput: "basic",
      nameInput: "comission",
      idInput: "comission",
      placeholderInput: "Enter your Comission",
      typeFormatValue: "string",
    },
    {
      name: EHeaderColumTransactions.Status,
      valueSelect: "statusPaymentColum",
      typeInput: "text",
      modeInput: "basic",
      nameInput: "status",
      idInput: "status",
      placeholderInput: "Enter your Status Payment",
      typeFormatValue: "stg",
    },
    {
      name: EHeaderColumTransactions.Receiver,
      valueSelect: "receiverColum",
      typeInput: "text",
      modeInput: "basic",
      nameInput: "receiver",
      idInput: "receiver",
      placeholderInput: "Enter your receiver",
      typeFormatValue: "stg",
    },
  ];
   const infoExcel = {
    nameColumnExcel:[
      "transaction id",
      "ip",
      "type of transaction",
      "status",
      "result",
      "receiver",
      "comission",
      "comissionType",
      "available/deleted",
      "email",
      "referrer",
      "id",
    ],
    nameAddressExcelDl:'landbank/transactions',
  }
  useEffect(() => {
    (async () => await automaticLoadTableData({filterValue:tempFilterDef}))();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const automaticLoadTableData = async ({
    page = 0,
    pageSize = 5,
    sortingValue = tempSortDef,
    filterValue = tempFilterDef,
  }) => {
    setLoadingTable(true);
    try {
      let allTransactions = (await (
        await ApiService()
          .transaction()
          .getAllTransaction(page + 1, pageSize, sortingValue, filterValue)
      ).data) as ITransactionsListTable;
      setRowCountState(allTransactions.totalResults);
      setRows(
        allTransactions.results.map((item, index) => {
          return {
            idColum: item.id,
            emailColum: item.user.email,
            transactionCodeColum: item.transactionCode,
            typePaymentColum: ConvertNameTypeTransaction(item.type),
            statusPaymentColum: item.status,
            ipColum: item.ip,
            receiverColum:item.receiver,
            commissionValueColum:item.comission
            
          };
        })
      );
    } catch (error) {
      return error;
    }
    setLoadingTable(false);
  };
  return (
    <TableDataGridCustomComponent<IFormFilterTransactionsTableDataGridCustom>
      infoDlExcel={infoExcel}
      sortValueMainDefault={tempSortDef}
      filterValueMainDefault={tempFilterDef}
      yupValidatorFormFilter={FormFilterTransactionsSchema}
      initialStateFormFilterValue={initialStateFormFilterValue}
      filterValueDefault={filterValueDefault}
      setFilterValueDefault={setFilterValueDefault}
      setAutomaticLoadTableData={automaticLoadTableData}
      columnsSortValueDefault={listSortingColum}
      sortValueDefault={sortValueDefault}
      setPageSize={setPageSize}
      setPage={setPage}
      loadingTable={loadingTable}
      pageSize={pageSize}
      settingsListFilterColumn={settingsListFilterColumn}
      rowCountState={rowCountState}
      setSortValueDefault={setSortValueDefault}
      page={page}
      rows={rows}
      columns={TransactionCashPickUpColumnsDataGridList}
      componentActionFooter={<div></div>}
    />
  );
};

export default TransactionCashPickUpHome;
