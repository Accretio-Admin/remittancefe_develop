import { ITableDataGridMenuFilterStyledCustom } from "../../interfaces/table_datagrid/ITableDataGrid.interface";
import { Menu, styled } from "../mui";

export const TableDataGridMenuStyledCustom = styled(Menu)(() => ({
  "& .MuiList-root": {
    padding: 0,
    width:'250px'
  },
  "& .MuiPaper-root": {
    marginTop: "10px",
    paddingTop: "1px",
  },
}));
export const TableDataGridMenuFilterStyledCustom = styled(Menu)<ITableDataGridMenuFilterStyledCustom>(({ ...props }) => ({
  "& .MuiList-root": {
    padding: 0,
  },
  "& .MuiPaper-root": {
    padding: "10px",
    width: `${props.widthContainer}px`,
    margin: "10px 0px",
    marginLeft:"65px",
  },
}));
