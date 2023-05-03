import React, { useEffect, useState } from "react";
import { GridRowsProp } from "../../mui";
import { ESorting } from "../../../interfaces/customs/ICustoms.interface";
import TableDataGridCustomComponent from "../../table_datagrid/TableDataGridCustom";
import {
  EHeaderColumUserIpWhiteList,
  ITableDataGridFilterCustomListItemFilter,
} from "../../../interfaces/table_datagrid/ITableDataGrid.interface";
import { IFormAdminIpWhiteListTableDataGridCustom } from "../../../interfaces/formik/IFormik.interface";
import { FormFilterUsersSchema } from "../../../utils/yup";
import { IAdminTableIpWhiteList } from "../../../interfaces/admins/IAdmins.interface";
import { AdminTableAssignIpUserListColumnsDataGridList } from "./AdminTableAssignIpUserListColumnsDataGridList";
import { ApiService } from "../../../services/ApiService";
import AdminFormAddAssignIpUserComponent from "./AdminFormAddAssignIpUser";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { setListenerUpdateTableAssignIpUser } from "../../../redux/features/admin_assign_ip_user/AdminAssignIpUser-Slice";
import { setShowFullPage } from "../../../redux/features/loading_full_page/LoadingFullPage-Slice";
import { useRouter } from "next/router";
import ItemBoxCustomComponent from "../../customs/ItemBoxCustom";

const AdmTableDataGridAssignIpUserComponent = () => {
  const router = useRouter();
  const [idQuery, setIdQuery] = useState<string>("");
  const dispatch = useAppDispatch();
  const { updateTableAssignIpUser } = useAppSelector(
    (state) => state.admin_assign_ip_user
  );
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [loadingTable, setLoadingTable] = useState<boolean>(true);
  const [rowCountState, setRowCountState] = useState<number>(0);
  const tempSortDef: string = "value:asc";
  const tempFilterDef: string = "";
  const [sortValueDefault, setSortValueDefault] = useState<string>(tempSortDef);
  const [filterValueDefault, setFilterValueDefault] =
    useState<string>(tempFilterDef);
  const [initialStateFormFilterValue, setInitialStateFormFilterValue] =
    useState<IFormAdminIpWhiteListTableDataGridCustom>({
      value: "",
    });

  let listSortingColum = [
    {
      field: "valueColum",
      sort: ESorting.asc,
      name: "value",
    },
  ];
  let settingsListFilterColumn: ITableDataGridFilterCustomListItemFilter[] = [
    {
      name: EHeaderColumUserIpWhiteList.value,
      valueSelect: "valueColum",
      typeInput: "text",
      nameInput: "value",
      modeInput: "basic",
      idInput: "value",
      placeholderInput: "Enter your value",
      typeFormatValue: "stg",
    },
  ];
  const infoExcel = {
    nameColumnExcel: ["available/deleted", "userId", "ip", "limitType", "id"],
    nameAddressExcelDl: `users/limits/${idQuery}`,
  };
  useEffect(() => {
    (async () => {
      if (!router.isReady && !router.query.id) return;
      setIdQuery(router.query.id as string);
      await automaticLoadTableData({ idUser: router.query.id as string });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);
  // the useEffect For Update Table
  useEffect(() => {
    if (!updateTableAssignIpUser) return;
    (async () => {
      await automaticLoadTableData({});
      dispatch(setListenerUpdateTableAssignIpUser(false));
      dispatch(setShowFullPage({ active: false }));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateTableAssignIpUser]);
  const automaticLoadTableData = async ({
    idUser = idQuery,
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
          .allAssignIpUsers(
            idUser,
            page + 1,
            pageSize,
            sortingValue,
            filterValue
          )
      ).data) as IAdminTableIpWhiteList;
      setRowCountState(allUsers.totalResults);
      setRows(
        allUsers.results.map((item) => {
          return {
            limitTypeColum: item.limitType,
            valueColum: item.value,
            idColum: item.id,
          };
        })
      );
    } catch (error) {
      return error;
    }
    setLoadingTable(false);
  };
  return (
    <div id="assign_ip_scroll">
      <p className="text-center font-bold text-2xl my-5">Assign IP</p>
      <div className="my-5">
        <AdminFormAddAssignIpUserComponent
          idQuery={idQuery}
          callBackUpdateTable={() => automaticLoadTableData({})}
        />
      </div>
      {/* Show All Ips */}
      <div className="p-3">
        <ItemBoxCustomComponent>
          <>
            <p className="text-center m-0  font-semibold text-xl">
              User Ip List
            </p>
            <TableDataGridCustomComponent<IFormAdminIpWhiteListTableDataGridCustom>
              removePaddingContainerTableDataGridParent={true}
              infoDlExcel={infoExcel}
              filterValueMainDefault={tempFilterDef}
              sortValueMainDefault={tempSortDef}
              yupValidatorFormFilter={FormFilterUsersSchema}
              modeRowFirstTable="null"
              initialStateFormFilterValue={initialStateFormFilterValue}
              filterValueDefault={filterValueDefault}
              removeBackgroundMainTableDataGrid={true}
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
              columns={AdminTableAssignIpUserListColumnsDataGridList}
              componentActionFooter={<div></div>}
            />
          </>
        </ItemBoxCustomComponent>
      </div>
    </div>
  );
};

export default AdmTableDataGridAssignIpUserComponent;
