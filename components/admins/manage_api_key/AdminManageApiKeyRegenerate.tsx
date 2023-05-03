import React, { useState } from "react";
import ButtonCustomOne from "../../buttons/ButtonCustomOne";
import IconButtonCustomOne from "../../buttons/IconButtonCustomOne";
import ModalCustomComponent from "../../customs/ModalCustom";
import { CachedIcon } from "../../mui";
import { ApiService } from "../../../services/ApiService";
import { useAppDispatch } from "../../../redux/hook";
import { setShowFullPage } from "../../../redux/features/loading_full_page/LoadingFullPage-Slice";
import { IAdminManageApiKeyRegenerate } from "../../../interfaces/admins/IAdminManageApiKey.interface";
const AdminManageApiKeyRegenerateComponent = ({
  apiToken,
  idApiToken,
  callbackUpdateListApiKeys
}:IAdminManageApiKeyRegenerate) => {
  const dispatch = useAppDispatch();
  const [showOrOffModal, setShowOrOffModal] = useState<boolean>(false);
  const regenerateAndUpdateApiKey = async (token:string)=>{
    dispatch(setShowFullPage({ active: true }));
    try {
      (await ApiService().manageApiKeys().generateUpdateApiKey(token)).data;
      await callbackUpdateListApiKeys();
      setShowOrOffModal(false)
    } catch (error) {
      return error;
    }
    dispatch(setShowFullPage({ active: false }));
  }
  return (
    <>
      <IconButtonCustomOne
        type="button"
        onClick={() => setShowOrOffModal(true)}
        colorIconCustom="nsBlack1"
        bgColorCustom="nsLightningYellow1"
        aria-label="regenerate code api key "
      >
        <CachedIcon />
      </IconButtonCustomOne>
      <div className="mx-5"></div>
      <ButtonCustomOne
        onClick={() => navigator.clipboard.writeText(apiToken)}
        disabledOpacityValue="0.5"
        sizeBorderRadius="md"
        sizeHeight="sm"
        bgColorCustom="nsLightningYellow1"
        colorTextCustom="nsWhite1"
        variant="contained"
        size="large"
        type="button"
      >
        Copy
      </ButtonCustomOne>
      <ModalCustomComponent
        onClickCancel={setShowOrOffModal}
        handleOpenModalValue={showOrOffModal}
        titleModal="Regenerate Api Key"
        descriptionModal={`Do you want to regenerate this key ${apiToken.slice(0, 10) + "..."} ?`}
        nameBtnAccept="Yes"
        nameBtnCancel="No"
        onClickAccept={async()=> regenerateAndUpdateApiKey(idApiToken)}
      />
    </>
  );
};

export default AdminManageApiKeyRegenerateComponent;
