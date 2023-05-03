import React from "react";
import ButtonCustomOne from "../../buttons/ButtonCustomOne";
import { ApiService } from "../../../services/ApiService";
import { LocalStorageAuthService } from "../../../services/LocalStorageAuthService";
import { useRouter } from "next/router";
import { useAppDispatch } from "../../../redux/hook";
import { setShowFullPage } from "../../../redux/features/loading_full_page/LoadingFullPage-Slice";
import { ICallbackUpdateListApiKeys } from "../../../interfaces/admins/IAdminManageApiKey.interface";

const AdminManageApiKeyCreateCustomComponentCustom = ({
  callbackUpdateListApiKeys
}: ICallbackUpdateListApiKeys) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleClickGenerate = async () => {
    dispatch(setShowFullPage({ active: true }));
    try {
      (
         await ApiService()
          .manageApiKeys()
          .generateApiKey({
            userId: router.query.id as string,
            referrerId: LocalStorageAuthService().getUser()?.user.id as string,
            endpointGroupId: "63fbb11fc54eb59a34d4ef97",
          })
      ).data;
      callbackUpdateListApiKeys()
    } catch (error) {
      return error;
    }
    dispatch(setShowFullPage({ active: true }));
  };
  return (
      <ButtonCustomOne
        disabledOpacityValue="0.5"
        boxShadowCustom="nsTwo"
        sizeBorderRadius="md"
        sizeHeight="md"
        bgColorCustom="nsLightningYellow1"
        dropShadowCustom="nsOne"
        colorTextCustom="nsWhite1"
        variant="contained"
        onClick={() => handleClickGenerate()}
        className="w-full"
        size="large"
        type="button"
      >
        Create Api Key
      </ButtonCustomOne>
  );
};

export default AdminManageApiKeyCreateCustomComponentCustom;
