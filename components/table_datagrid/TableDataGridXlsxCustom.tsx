import { ApiService } from "../../services/ApiService";
import IconButtonCustomOne from "../buttons/IconButtonCustomOne";
import { GetAppOutlinedIcon } from "../mui";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import TooltipCustomComponent from "../customs/TooltipCustom";
import { useAppDispatch } from "../../redux/hook";
import { setShowFullPage } from "../../redux/features/loading_full_page/LoadingFullPage-Slice";
import { ITableDataGridCustomDlExcel } from "../../interfaces/table_datagrid/ITableDataGrid.interface";
import { ConvertUserLockUnlockNumberToString } from "../../utils/other/ConvertTypeLockUnlockUser";
import { ConvertNameTypeTransaction } from "../../utils/other/ConvertNameTypeTransaction";
export const TableDataGridXlsxCustomComponent = ({
  infoDlExcel,
  filterValueDefault,
  sortValueDefault,
}: ITableDataGridCustomDlExcel) => {
  const objectNameConverter = {
    deleted: "deleted",
    locked: "locked",
    type: "type",
    user: "user",
  };
  const dispatch = useAppDispatch();
  const handleDownloadXlsx = async () => {
    dispatch(setShowFullPage({ active: true }));
    let { results } = await (
      await ApiService()
        .other()
        .getAllForExcel(
          infoDlExcel.nameAddressExcelDl,
          sortValueDefault,
          filterValueDefault
        )
    ).data;
    let convertResResult = removeDuplicate(results) as any[];
    convertResResult = handleObjectNameToChangeValue({
      arrayItem: convertResResult,
    });
    convertToExcel({
      arrayItemExcel: convertResResult,
      headerNameExcel: infoDlExcel.nameColumnExcel,
    });
    dispatch(setShowFullPage({ active: false }));
  };
  // Change Name Filed Value In The Array As Object
  const handleObjectNameToChangeValue = ({
    arrayItem,
  }: {
    arrayItem: Array<any>;
  }) => {
    for (const key in objectNameConverter) {
      arrayItem.map((item) => {
        if (Object.prototype.hasOwnProperty.call(item, key)) {
          switch (key) {
            case "deleted":
              return (item[key] = item[key] ? "deleted" : "available");
            case "locked":
              return (item[key] = ConvertUserLockUnlockNumberToString(
                item.locked
              ));
            case "type":
              return (item[key] = ConvertNameTypeTransaction(item.type));
            case "user":
              return (item[key] = item.user.email);
            default:
              break;
          }
        }
      });
    }
    return arrayItem;
  };
  // Remove Duplication Array
  const removeDuplicate = (items: Array<{ id: string }>) => {
    return items.filter((v, i, a) => a.findIndex((v2) => v2.id === v.id) === i);
  };
  // Convert To Excel File 2 Arg Array Item, Name Header Columns
  const convertToExcel = ({
    arrayItemExcel,
    headerNameExcel,
  }: {
    arrayItemExcel: any;
    headerNameExcel: any;
  }) => {
    const ws = XLSX.utils.book_new();
    XLSX.utils.sheet_add_aoa(ws, [headerNameExcel]);
    XLSX.utils.sheet_add_json(ws, arrayItemExcel, {
      origin: "A2",
      skipHeader: true,
    });
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
      cellStyles: true,
    });
    const finalData = new Blob([excelBuffer], { type: "string" });
    saveAs(finalData, `${new Date()}.xlsx`);
  };
  return (
    <TooltipCustomComponent title="Download Excel">
      <div>
        <IconButtonCustomOne
          boxShadowCustom="nsTwo"
          bgColorCustom="nsConcrete1"
          sizeBorderRadius="md"
          onClick={() => handleDownloadXlsx()}
          colorIconCustom="nsBlack1"
          aria-label="download file xlsx"
        >
          <GetAppOutlinedIcon />
        </IconButtonCustomOne>
      </div>
    </TooltipCustomComponent>
  );
};
