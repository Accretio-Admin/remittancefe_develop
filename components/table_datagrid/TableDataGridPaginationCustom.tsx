import React from "react";
import { ITableDataGridPaginationCustom } from "../../interfaces/table_datagrid/ITableDataGrid.interface";
import {
  gridPageSelector,
  TablePagination,
  gridRowCountSelector,
  useGridSelector,
  gridPageSizeSelector,
  useGridApiContext,
} from "../mui";
export const TableDataGridPaginationCustomComponent = ({
  isDisabled,
  children,
}: ITableDataGridPaginationCustom) => {
  const gridApiContext = useGridApiContext();

  const page = useGridSelector(gridApiContext, gridPageSelector);
  const rowCount = useGridSelector(gridApiContext, gridRowCountSelector);
  const pageSize = useGridSelector(gridApiContext, gridPageSizeSelector);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    gridApiContext.current.setPage(newPage);
  };

  const handleChangePageSize = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    gridApiContext.current.setPageSize(parseInt(event.target.value, 10));
  };
  return (
    <>
      <TablePagination
        SelectProps={{
          disabled: isDisabled,
        }}
        backIconButtonProps={
          isDisabled
            ? {
                disabled: isDisabled,
              }
            : undefined
        }
        nextIconButtonProps={
          isDisabled
            ? {
                disabled: isDisabled,
              }
            : undefined
        }
        className="pagination-container"
        component="div"
        count={rowCount}
        page={page}
        rowsPerPage={pageSize}
        onRowsPerPageChange={handleChangePageSize}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 15]}
      />
      {children}
    </>
  );
};
