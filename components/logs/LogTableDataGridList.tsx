import React, { useEffect, useState } from "react";
import TableDataGridCustomComponent from "../table_datagrid/TableDataGridCustom";
import { GridRowsProp } from "../mui";
import { ESorting } from "../../interfaces/customs/ICustoms.interface";
import {
  EHeaderColumLogs,
  ITableDataGridFilterCustomListItemFilter,
} from "../../interfaces/table_datagrid/ITableDataGrid.interface";
import { ApiService } from "../../services/ApiService";
import { IFormFilterLogsTableDataGridCustom } from "../../interfaces/formik/IFormik.interface";
import { FormFilterTransactionsSchema } from "../../utils/yup";
import { LogsColumnsDataGridList } from "./LogsColumnsDataGridList";
import { ILogsTable } from "../../interfaces/logs/ILogs.interface";
const LogTableDataGridList = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [loadingTable, setLoadingTable] = useState<boolean>(true);
  const [rowCountState, setRowCountState] = useState<number>(0);
  const tempSortDef: string =
    "enterTime:asc,enterDate:asc,exitTime:asc,exitDate:asc,ip:asc,duration:asc";
  const tempFilterDef: string = "";
  const [sortValueDefault, setSortValueDefault] = useState<string>(tempSortDef);
  const [filterValueDefault, setFilterValueDefault] =
    useState<string>(tempFilterDef);
  const [initialStateFormFilterValue, setInitialStateFormFilterValue] =
    useState<IFormFilterLogsTableDataGridCustom>({
      enterDate: "",
      enterTime: "",
      exitDate: "",
      exitTime: "",
      duration: "",
      ip: "",
    });
  let listSortingColum = [
    {
      field: "enterTimeColum",
      sort: ESorting.asc,
      name: "enterTime",
    },
    {
      field: "enterDateColum",
      sort: ESorting.asc,
      name: "enterDate",
    },
    {
      field: "exitTimeColum",
      sort: ESorting.asc,
      name: "exitTime",
    },
    {
      field: "exitDateColum",
      sort: ESorting.asc,
      name: "exitDate",
    },
    {
      field: "ipColum",
      sort: ESorting.asc,
      name: "ip",
    },
    {
      field: "durationColum",
      sort: ESorting.asc,
      name: "duration",
    },
  ];
  let settingsListFilterColumn: ITableDataGridFilterCustomListItemFilter[] = [
    {
      name: EHeaderColumLogs.enterTime,
      valueSelect: "enterTimeColum",
      typeInput: "text",
      nameInput: "enterTime",
      modeInput: "basic",
      idInput: "enterTime",
      placeholderInput: "Enter your Enter Time",
      typeFormatValue: "string",
    },
    {
      name: EHeaderColumLogs.enterDate,
      valueSelect: "enterDateColum",
      typeInput: "text",
      nameInput: "enterDate",
      modeInput: "basic",
      idInput: "enterDate",
      placeholderInput: "Enter your Enter Date",
      typeFormatValue: "stg",
    },
    {
      name: EHeaderColumLogs.exitTime,
      valueSelect: "exitTimeColum",
      typeInput: "text",
      nameInput: "exitTime",
      modeInput: "basic",
      idInput: "exitTime",
      placeholderInput: "Enter your Exit Time",
      typeFormatValue: "string",
    },
    {
      name: EHeaderColumLogs.exitDate,
      valueSelect: "exitDateColum",
      typeInput: "text",
      nameInput: "exitDate",
      modeInput: "basic",
      idInput: "exitDate",
      placeholderInput: "Enter your Exit Date",
      typeFormatValue: "stg",
    },
    {
      name: EHeaderColumLogs.ip,
      valueSelect: "ipColum",
      typeInput: "text",
      nameInput: "ip",
      modeInput: "basic",
      idInput: "ip",
      placeholderInput: "Enter your Ip",
      typeFormatValue: "stg",
    },
  ];
  const infoExcel = {
    nameColumnExcel: [
      "ip",
      "changes",
      "duration",
      "deleted",
      "enterTime",
      "enterDate",
      "exitTime",
      "exitDate",
      "id",
    ],
    nameAddressExcelDl: "logs",
  };
  useEffect(() => {
    (async () =>
      await automaticLoadTableData({ filterValue: tempFilterDef }))();
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
      let allLogs = (await (
        await ApiService()
          .logs()
          .getAllLogs(page + 1, pageSize, sortingValue, filterValue)
      ).data) as ILogsTable;
      setRowCountState(allLogs.totalResults);
      setRows(
        allLogs.results.map((item, index) => {
          return {
            idColum: item.id,
            enterTimeColum: item.enterTime,
            enterDateColum: item.enterDate,
            exitTimeColum: item.exitTime,
            exitDateColum: item.exitDate,
            ipColum: item.ip,
            changesColum: item.changes,
            durationColum: item.duration,
          };
        })
      );
    } catch (error) {
      return error;
    }
    setLoadingTable(false);
  };
  return (
    <TableDataGridCustomComponent<IFormFilterLogsTableDataGridCustom>
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
      columns={LogsColumnsDataGridList}
      componentActionFooter={<div></div>}
    />
  );
};

export default LogTableDataGridList;
