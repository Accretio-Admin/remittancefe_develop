import React from "react";
import InputCustomOne from "../../inputs/InputCustomOne";
import { MenuItem } from "@mui/material";
import {
  IConfigApiGroupsManagementResult,
  IConfigApiGroupsManagements,
} from "../../../interfaces/configs/IConfigTransaction.interface";
import { ApiService } from "../../../services/ApiService";
import { useAppDispatch } from "../../../redux/hook";
import { setShowFullPage } from "../../../redux/features/loading_full_page/LoadingFullPage-Slice";

const AdminManageApiKeySelectApiKeyComponentCustom = ({
  allApiGroupManagement,
  idEndpointGroupId,
  idApiKey,
  callbackUpdateListApiKeys
}: {
  allApiGroupManagement: IConfigApiGroupsManagements;
  idEndpointGroupId: string;
  idApiKey: string;
  callbackUpdateListApiKeys:()=> void
}) => {
  const dispatch =useAppDispatch()
  return (
    <div className="px-4 my-5">
      <InputCustomOne
        colorInputCustom="nsBlack1"
        borderRadiusCustom="md"
        bgColorCustom="nsWhite1"
        fontSizeCustom="sm"
        fieldsetBorderColorCustom="nsGray1"
        placeholderColorCustom="nsBlack1"
        focusedPlaceholderColorCustom="nsBlack1"
        muiFocusedShadowCustom="nsOne"
        select
        SelectProps={{ MenuProps: { disableScrollLock: true } }}
        type="text"
        onChange={async (event) => {
          dispatch(setShowFullPage({ active: true }));
          const idEndpointSelect = (
            allApiGroupManagement.results.find(
              (item) => item.name == event.target.value
            ) as IConfigApiGroupsManagementResult
          ).id;
          await (
            await ApiService()
              .manageApiKeys()
              .reUpdateApiKeyForAssign(
                { endpointGroupId: idEndpointSelect },
                idApiKey
              )
          ).data;
          dispatch(setShowFullPage({ active: false }));
          callbackUpdateListApiKeys();
        }}
        value={
          (
            allApiGroupManagement.results.find(
              (item) => item.id == idEndpointGroupId
            ) as IConfigApiGroupsManagementResult
          ).name
        }
      >
        {allApiGroupManagement.results.map((item, index) => {
          return (
            <MenuItem key={index} value={item.name}>
              {item.name}
            </MenuItem>
          );
        })}
      </InputCustomOne>
    </div>
  );
};

export default AdminManageApiKeySelectApiKeyComponentCustom;
