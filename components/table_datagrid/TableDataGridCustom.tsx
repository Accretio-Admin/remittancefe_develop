import React from "react";
import { ITableDataGridCustom } from "../../interfaces/table_datagrid/ITableDataGrid.interface";
import { ConvertStringSortTableApi } from "../../utils/other/ConvertStringSortTableApi";
import {
  TableDataGridStyledCustom,
  TableDataGridPaginationCustomComponent,
  TableDataGridXlsxCustomComponent,
  TableDataGridIconSortingDesAndAscCustom,
} from "./index";
import { GridSortModel } from "../mui";
import { TableDataGridFilterCustomComponent } from "./index";

const TableDataGridCustomComponent = <TIV,>({
  setSortValueDefault,
  setPageSize,
  setPage,
  loadingTable,
  pageSize,
  rowCountState,
  page,
  rows,
  columns,
  componentActionFooter,
  sortValueDefault,
  columnsSortValueDefault,
  settingsListFilterColumn,
  setAutomaticLoadTableData,
  filterValueDefault,
  setFilterValueDefault,
  initialStateFormFilterValue,
  yupValidatorFormFilter,
  modeRowFirstTable = "null",
  sortValueMainDefault,
  removeBackgroundMainTableDataGrid = false,
  filterValueMainDefault,
  infoDlExcel,
  removePaddingContainerTableDataGridParent=false
}: ITableDataGridCustom<TIV>) => {
  // Sort Colum
  const handleSortModelChange = async (sortModel: GridSortModel) => {
    let tempSort: string = ConvertStringSortTableApi(
      sortModel,
      columnsSortValueDefault,
      sortValueMainDefault
    ) as string;
    setSortValueDefault(tempSort);
    setAutomaticLoadTableData({
      page,
      pageSize,
      sortingValue: tempSort,
      filterValue: filterValueDefault,
    });
  };

  // Show Row Item 5||15|20
  const handleOnPageSizeChange = async (pageSizeArg: number) => {
    setPageSize(pageSizeArg);
    setAutomaticLoadTableData({
      page,
      pageSize: pageSizeArg,
      sortingValue: sortValueDefault,
      filterValue: filterValueDefault,
    });
  };
  // Page 1,2,3,4
  const handleOnPageChange = async (pageArg: number) => {
    setPage(pageArg);
    setAutomaticLoadTableData({
      page: pageArg,
      pageSize: pageSize,
      sortingValue: sortValueDefault,
      filterValue: filterValueDefault,
    });
  };

  return (
    <>
      <TableDataGridStyledCustom
        removePaddingContainerTableDataGridParent={removePaddingContainerTableDataGridParent}
        modeRowFirstTable={modeRowFirstTable}
        removeBackgroundMainTableDataGrid={removeBackgroundMainTableDataGrid}
        hideFooterSelectedRowCount={true}
        getRowId={(row: any) => row.idColum}
        rows={rows}
        headerHeight={45}
        rowHeight={45}
        columns={columns}
        paginationMode="server"
        loading={loadingTable}
        page={page}
        onPageChange={(pageArgValue) => handleOnPageChange(pageArgValue)}
        rowCount={rowCountState}
        onPageSizeChange={(pageSizeArgValue) =>
          handleOnPageSizeChange(pageSizeArgValue)
        }
        pageSize={pageSize}
        sortingMode="server"
        showCellRightBorder
        showColumnRightBorder
        disableExtendRowFullWidth
        filterMode="server"
        onSortModelChange={(newSortModel) =>
          handleSortModelChange(newSortModel)
        }
        components={{
          Pagination: () => (
            <TableDataGridPaginationCustomComponent isDisabled={loadingTable}>
              {componentActionFooter}
            </TableDataGridPaginationCustomComponent>
          ),
          ColumnSortedDescendingIcon: () => (
            <TableDataGridIconSortingDesAndAscCustom name="desc" />
          ),
          ColumnSortedAscendingIcon: () => (
            <TableDataGridIconSortingDesAndAscCustom name="asc" />
          ),
          Toolbar: () => (
            !loadingTable ? 
             <div className="flex items-end justify-end mb-5">
              <TableDataGridFilterCustomComponent<TIV>
                yupValidatorFormFilter={yupValidatorFormFilter}
                initialStateFormFilterValue={initialStateFormFilterValue}
                filterValue={filterValueDefault}
                page={page}
                pageSize={pageSize}
                loadingTable={loadingTable}
                sortingValue={sortValueDefault}
                setFilterValueDefault={setFilterValueDefault}
                settingsListFilterColumn={settingsListFilterColumn}
                setAutomaticLoadTableData={setAutomaticLoadTableData}
                filterValueMainDefault={filterValueMainDefault}
              />
              <div className="mx-3" />
              <TableDataGridXlsxCustomComponent sortValueMainDefault={sortValueMainDefault} sortValueDefault={sortValueDefault} filterValueDefault={filterValueDefault} filterValueMainDefault={filterValueMainDefault} infoDlExcel={infoDlExcel} />
            </div>:<></>
    
          ),
        }}
      />
    </>
  );
};

export default TableDataGridCustomComponent;
