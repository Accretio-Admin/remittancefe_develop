import { GridSortModel } from "../../components/mui";
import {
  ESorting,
  IConvertStringSortTableApi,
} from "../../interfaces/customs/ICustoms.interface";
export const ConvertStringSortTableApi = (
  sortModel: GridSortModel,
  listSortingColum: Array<IConvertStringSortTableApi>,
  defaultSorting: string
) => {
  if (sortModel.length == 0) return defaultSorting;
  let tempSortTable: IConvertStringSortTableApi;
  let temp = listSortingColum.find(
    (item) => item.field == sortModel[0].field
  ) as IConvertStringSortTableApi;
  tempSortTable = {
    ...temp,
    sort: sortModel[0].sort as ESorting,
  };
  listSortingColum = listSortingColum.filter((item)=> item.field !== sortModel[0].field)
  return insertCustom(listSortingColum, 0, tempSortTable)
    .map((item) => `${item.name}:${item.sort}`)
    .join();
};
const insertCustom = (
  arr: Array<IConvertStringSortTableApi>,
  index: number,
  newItem: IConvertStringSortTableApi
) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // inserted item
  newItem,
  // part of the array after the specified index
  ...arr.slice(index),
];
