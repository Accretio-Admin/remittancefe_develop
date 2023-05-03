import React, { useEffect, useState } from "react";
import { IAllUsers } from "../../interfaces/user/IAllUsers.interface";
import { ApiService } from "../../services/ApiService";
import { GridRowsProp } from "../mui";
import { helperThisUserIsMe } from "../../utils/helperMe";
import { AdminColumnsDataGridList } from "./AdminColumnsDataGridList";
import { ESorting } from "../../interfaces/customs/ICustoms.interface";
import AdmItemBtnAddNewUserComponent from "./AdmItemBtnAddNewUser";
import TableDataGridCustomComponent from "../table_datagrid/TableDataGridCustom";
import {
  EHeaderColumUser,
  ITableDataGridFilterCustomListItemFilter,
} from "../../interfaces/table_datagrid/ITableDataGrid.interface";
import { IFormFilterUserTableDataGridCustom } from "../../interfaces/formik/IFormik.interface";
import { FormFilterUsersSchema } from "../../utils/yup";
import UserAccessGuardComponentComponent from "../customs/UserAccessGuardComponent";
import { LocalStorageAuthService } from "../../services/LocalStorageService";
import { UserLimitationBulk } from "../../interfaces/user/IUser.interface";
const AdminsListComponent = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [loadingTable, setLoadingTable] = useState<boolean>(true);
  const [rowCountState, setRowCountState] = useState<number>(0);
  const tempSortDef: string = "name:asc,role:asc,email:asc";
  const tempFilterDef: string = "";
  const [sortValueDefault, setSortValueDefault] = useState<string>(tempSortDef);
  const [firstRowHasActive, setFirstRowHasActive] = useState<boolean>();
  const [filterValueDefault, setFilterValueDefault] =
    useState<string>(tempFilterDef);
  const [initialStateFormFilterValue, setInitialStateFormFilterValue] =
    useState<IFormFilterUserTableDataGridCustom>({
      email: "",
      name: "",
      role: "",
    });

  let listSortingColum = [
    {
      field: "nameColum",
      sort: ESorting.asc,
      name: "name",
    },
    {
      field: "roleColum",
      sort: ESorting.asc,
      name: "role",
    },
    {
      field: "emailColum",
      sort: ESorting.asc,
      name: "email",
    },
  ];
  let settingsListFilterColumn: ITableDataGridFilterCustomListItemFilter[] = [
    {
      name: EHeaderColumUser.Name,
      valueSelect: "nameColum",
      typeInput: "text",
      nameInput: "name",
      modeInput: "basic",
      idInput: "name",
      placeholderInput: "Enter your name",
      typeFormatValue: "stg",
    },
    {
      name: EHeaderColumUser.Role,
      valueSelect: "roleColum",
      typeInput: "select",
      modeInput: "select",
      ModeInputTypeSection:"user",
      nameInput: "role",
      idInput: "role",
      placeholderInput: "Select your role",
      typeFormatValue: "string",
    },
    {
      name: EHeaderColumUser.Email,
      valueSelect: "emailColum",
      typeInput: "text",
      modeInput: "basic",
      nameInput: "email",
      idInput: "email",
      placeholderInput: "Enter your email",
      typeFormatValue: "stg",
    },
  ];
  const infoExcel = {
    nameColumnExcel:[
      "locked/unlocked",
      "available/deleted",
      "role",
      "isEmailVerified",
      "name",
      "email",
      "id",
    ],
    nameAddressExcelDl:"users",
  }
  useEffect(() => {
    (async () => await automaticLoadTableData({}))();
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
      let allUsers = (await (
        await ApiService()
          .users()
          .getAllUsers(page + 1, pageSize, sortingValue, filterValue)
      ).data) as IAllUsers;
      setRowCountState(allUsers.totalResults);
      // Convert Id ,
      let idUsersForBulk:string='';
      allUsers.results.map((item,index)=> idUsersForBulk += `${item.id}${allUsers.results.length-1 !== index ? ",":""}`)
      // End Convert Id,
      let dataBulks = await (
        await ApiService().users().getAllBulkLimitation(idUsersForBulk as string)
      ).data as UserLimitationBulk[];
      allUsers.results.map((itemA)=> dataBulks.find((itemB)=> itemA.id == itemB.userId ? itemA.assigned = true : itemA.assigned = false))
      setRows(
        allUsers.results
          .filter((v, i, a) => a.findIndex((v2) => v2.id === v.id) === i)
          .map((item, index) => {
            return {
              nameColum: helperThisUserIsMe().checkById(item.id)
                ? `${item.name}(you)`
                : item.name,
              assignedColum: item.assigned,
              roleColum: item.role,
              idColum: item.id,
              lockedColum: item.locked,
              emailColum: item.email,
              actionsColum: item.id,
            };
          })
      );
      setFirstRowHasActive(allUsers.page == 1 ? true : false);
    } catch (error) {
      return error;
    }
    setLoadingTable(false);
  };
  return (
    <TableDataGridCustomComponent<IFormFilterUserTableDataGridCustom>
      infoDlExcel={infoExcel}
      filterValueMainDefault={tempFilterDef}
      sortValueMainDefault={tempSortDef}
      yupValidatorFormFilter={FormFilterUsersSchema}
      modeRowFirstTable={firstRowHasActive ? "users" : "null"}
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
      columns={AdminColumnsDataGridList}
      componentActionFooter={
        <UserAccessGuardComponentComponent
          childrenHidden={<div></div>}
          showChildrenHidden={true}
          showOrHidden={
            LocalStorageAuthService().getUserAccessLevels().users.listing.add
              .main
          }
        >
          <AdmItemBtnAddNewUserComponent />
        </UserAccessGuardComponentComponent>
      }
    />
  );
};

export default AdminsListComponent;
