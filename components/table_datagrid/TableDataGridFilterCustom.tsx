import { useState } from "react";
import IconButtonCustomOne from "../buttons/IconButtonCustomOne";
import {
  FilterAltOutlinedIcon,
  KeyboardArrowDownIcon,
  KeyboardArrowUpIcon,
} from "../mui";
import { ITableDataGridFilterCustom } from "../../interfaces/table_datagrid/ITableDataGrid.interface";
import { TableDataGridFilterInputAutoLoadComponent } from "./index";
import { Formik, FormikValues } from "formik";
import ButtonCustomOne from "../buttons/ButtonCustomOne";
import TooltipCustomComponent from "../customs/TooltipCustom";
import {
  TableDataGridMenuStyledCustom,
  TableDataGridMenuFilterStyledCustom,
} from "./TableDataGridMenuStyledCustom";
import styled from "../../styles/tableDataGridCustom.module.scss";
export const TableDataGridFilterCustomComponent = <TIV,>({
  settingsListFilterColumn,
  setAutomaticLoadTableData,
  setFilterValueDefault,
  page,
  pageSize,
  sortingValue,
  loadingTable,
  initialStateFormFilterValue,
  yupValidatorFormFilter,
  filterValueMainDefault,
}: ITableDataGridFilterCustom<TIV>) => {
  const [widthContainerToolFilter, setWidthContainerToolFilter] = useState<number>(0);
  const [anchorElMenuMain, setAnchorElMenuMain] = useState<null | HTMLElement>(
    null
  );
  const openMenuMain = Boolean(anchorElMenuMain);
  const [openFilterColumns, setOpenFilterColumns] = useState<string>("");
  const [arrowIconUpDown, setArrowIconUpDown] = useState<boolean>(false);
  // Open Menu
  const [anchorElMenu, setAnchorElMenu] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorElMenu);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setArrowIconUpDown(true);
    setOpenFilterColumns(
      settingsListFilterColumn.find(
        (item) => item.name == event.currentTarget.id
      )?.valueSelect as string
    );
    setAnchorElMenu(event.currentTarget);
  };
  const handleClose = () => {
    setArrowIconUpDown(false);
    setAnchorElMenu(null);
  };
  const handleClickMain = (event: React.MouseEvent<HTMLElement>) => {
    setWidthContainerToolFilter(
      document.querySelector<any>(".MuiDataGrid-main").offsetWidth
    );
    handleStyleToolFilter(true);
    setAnchorElMenuMain(event.currentTarget);
  };
  const handleCloseMain = () => {
    handleStyleToolFilter(false);
    setAnchorElMenuMain(null);
  };
  // End Menu
  const handleSetAutoInFilter = (convert: string) => {
    handleStyleToolFilter(false);
    setFilterValueDefault(convert);
    setAutomaticLoadTableData({
      page,
      pageSize,
      sortingValue,
      filterValue: convert,
    });
  };
  const handleStyleToolFilter = (value: boolean) => {
    let tableDataGridMain = document.querySelector(
      ".MuiDataGrid-main"
    ) as HTMLDivElement;
    if (value) {
      tableDataGridMain.style.marginTop = "160px";
    } else {
      tableDataGridMain.style.marginTop = "unset";
    }
  };
  return (
    <Formik
      enableReinitialize={true}
      validateOnMount
      initialValues={initialStateFormFilterValue as FormikValues}
      validationSchema={yupValidatorFormFilter}
      onSubmit={async (event, { setSubmitting }) => {
        let paramsFiltering = settingsListFilterColumn
          .filter((item) => event[item.nameInput])
          .map(
            (item1) =>
              `${item1?.idInput}|${item1?.typeFormatValue}=${
                event[item1?.nameInput as keyof typeof event]
              }`
          )
          .join(",");
        paramsFiltering =
          filterValueMainDefault == ""
            ? paramsFiltering
            : `${paramsFiltering},${filterValueMainDefault.replaceAll(
                "filter=",
                ""
              )}`;
        handleSetAutoInFilter(`filter=${paramsFiltering}`);
        setSubmitting(false);
      }}
    >
      {(props) => (
        <>
          <TooltipCustomComponent title="Filter">
            <div>
              <IconButtonCustomOne
                id="menu-filter-main"
                aria-controls={openMenuMain ? "menu-filter-main" : undefined}
                aria-haspopup="true"
                aria-expanded={openMenuMain ? "true" : undefined}
                onClick={handleClickMain}
                boxShadowCustom="nsTwo"
                bgColorCustom="nsConcrete1"
                sizeBorderRadius="md"
              >
                <FilterAltOutlinedIcon />
              </IconButtonCustomOne>
            </div>
          </TooltipCustomComponent>
          <TableDataGridMenuFilterStyledCustom
            widthContainer={widthContainerToolFilter}
            disableScrollLock={true}
            id="filter-tools-main"
            anchorEl={anchorElMenuMain}
            open={openMenuMain}
            onClose={handleCloseMain}
            MenuListProps={{
              "aria-labelledby": "filter-tools-main",
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <div className="flex">
              {settingsListFilterColumn.map((item, index) => {
                return (
                  <div key={index} className="mr-10">
                    <div
                      className={`cursor-pointer h-[35px] p-2 text-base font-medium rounded-nsBase  flex items-center ${
                        item.valueSelect == openFilterColumns
                          ? `${styled["active-filter-tools"]}`
                          : `${styled["deactivate-filter-tools"]}`
                      }   `}
                      id={item.name}
                      aria-controls={openMenu ? item.name : undefined}
                      aria-haspopup="true"
                      aria-expanded={openMenu ? "true" : undefined}
                      onClick={handleClick}
                      aria-label={item.name}
                    >
                      {item.name}
                      {arrowIconUpDown &&
                      item.valueSelect == openFilterColumns ? (
                        <KeyboardArrowUpIcon className="ml-3" />
                      ) : (
                        <KeyboardArrowDownIcon className="ml-3" />
                      )}
                      {props.values[item.nameInput]?.length >= 1 && (
                        <div className="bg-nsSin1 ml-3 w-[15px] h-[15px] rounded-nsFull" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <form
              onSubmit={props.handleSubmit}
              className="flex flex-row w-full  items-center justify-end"
            >
              <TableDataGridMenuStyledCustom
                disableScrollLock={true}
                id="basic-menu-filter-tools"
                anchorEl={anchorElMenu}
                open={openMenu}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button-filter-tools",
                }}
              >
                <TableDataGridFilterInputAutoLoadComponent
                  infoArrayFilter={settingsListFilterColumn}
                  valueSelectFilterColum={openFilterColumns}
                  formikProps={props}
                />
              </TableDataGridMenuStyledCustom>
              <div>
                <a
                  className="text-nsBlue1 underline cursor-pointer text-end"
                  onClick={() => {
                    handleSetAutoInFilter(
                      filterValueMainDefault == "" ? "" : filterValueMainDefault
                    );
                    props.resetForm();
                    handleStyleToolFilter(false);
                  }}
                >
                  <p>Reset</p>
                </a>
                <ButtonCustomOne
                  className="w-36"
                  sizeBorderRadius="md"
                  sizeHeight="sm"
                  bgColorCustom="nsSunglow1"
                  dropShadowCustom="nsOne"
                  colorTextCustom="nsBlack1"
                  variant="contained"
                  type="submit"
                  size="medium"
                  disabled={!(props.isValid && props.dirty) || loadingTable}
                >
                  <p className="font-semibold">Search</p>
                </ButtonCustomOne>
              </div>
            </form>
          </TableDataGridMenuFilterStyledCustom>
        </>
      )}
    </Formik>
  );
};
