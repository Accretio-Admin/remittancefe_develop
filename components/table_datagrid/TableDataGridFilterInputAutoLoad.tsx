import { Checkbox, InputAdornment,  SearchIcon } from "../mui";
import React, { KeyboardEvent } from "react";
import {
  EModeInput,
  ITableDataGridFilterCustomListItemFilter,
  ITableDataGridFilterInputAutoLoad,
  EModeInputTypeSection,
} from "../../interfaces/table_datagrid/ITableDataGrid.interface";
import { LocalStorageAuthService } from "../../services/LocalStorageService";
import { handleAccessMenuItemsRole } from "../../utils/AccessMenuItemsRole";
import InputCustomOne from "../inputs/InputCustomOne";
import { ERole } from "../../interfaces/axios/IAxios.interface";
import { TableDataGridStyleFormControlLabelCheckboxFilter } from "./TableDataGridStyleFormControlLabelCheckboxFilter";
import { helperThisUserIsMe } from "../../utils/helperMe";
import { Colors } from "../../utils/colors";

export const TableDataGridFilterInputAutoLoadComponent = ({
  infoArrayFilter,
  valueSelectFilterColum,
  formikProps,
}: ITableDataGridFilterInputAutoLoad) => {
  const handleInputs = (item: ITableDataGridFilterCustomListItemFilter) => {
    switch (item.modeInput) {
      case EModeInput.basic:
        return (
          <InputCustomOne
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
              e.stopPropagation();
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            colorInputCustom="nsBlack1"
            borderRadiusCustom="sm"
            bgColorCustom="nsCitrineWhite1"
            fontSizeCustom="sm"
            fieldsetBorderColorCustom="nsSunglow1"
            placeholderColorCustom="nsBlack1"
            focusedPlaceholderColorCustom="nsBlack1"
            muiFocusedShadowCustom="nsOne"
            fullWidth
            id={item.idInput}
            type={item.typeInput}
            name={item.nameInput}
            placeholder={item.placeholderInput}
            onChange={formikProps.handleChange}
            onBlur={formikProps.handleBlur}
            value={formikProps.values[item.nameInput]}
            error={
              formikProps.touched[item.nameInput] &&
              Boolean(formikProps.errors[item.nameInput])
            }
            helperText={
              formikProps.touched[item.nameInput] &&
              formikProps.errors[item.nameInput]
            }
          />
        );
      case EModeInput.select:
        return handleInputSelect(item);
      default:
        break;
    }
  };
  const handleInputSelect = (
    item: ITableDataGridFilterCustomListItemFilter
  ) => {
    switch (item.ModeInputTypeSection) {
      case EModeInputTypeSection.user:
        return (
          <div className="p-3 bg-nsCitrineWhite1 rounded-nsSm  border-2  border-solid border-nsSunglow1">
            {handleAccessMenuItemsRole(
              LocalStorageAuthService().getUser()?.user.role as ERole
            )?.map((itemAccess, index) => {
              return (
                <TableDataGridStyleFormControlLabelCheckboxFilter
                  labelPlacement="start"
                  key={index}
                  id={item.idInput}
                  control={
                    <Checkbox
                      style={{ color: Colors.nsLightningYellow1 }}
                      checked={formikProps.values[item.nameInput] == itemAccess}
                    />
                  }
                  label={helperThisUserIsMe().showNameRoleRealDynamic(
                    itemAccess as ERole
                  )}
                  name={item.nameInput}
                  onChange={() => {
                    formikProps.setFieldValue("role", itemAccess);
                  }}
                />
              );
            })}
          </div>
        );
    }
  };
  return (
    <>
      {infoArrayFilter.map((item, index) => {
        return (
          <div className="w-full" key={index}>
            {item.valueSelect == valueSelectFilterColum && handleInputs(item)}
          </div>
        );
      })}
    </>
  );
};
