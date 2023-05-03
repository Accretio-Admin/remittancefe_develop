import React, { useEffect, useState } from "react";
import { IAdminManageApiKey } from "../../../interfaces/admins/IAdminManageApiKey.interface";
import { ApiService } from "../../../services/ApiService";
import {
  AccordionCustom,
  AccordionItemCustom,
} from "../../accordion/AccordionCustom";
import AdminManageApiKeyAssignLandBankComponent from "./AdminManageApiKeyAssignLandBank";
import AdminManageApiKeyBoxListComponent from "./AdminManageApiKeyBoxList";
import AdminManageApiKeyRegenerateComponent from "./AdminManageApiKeyRegenerate";
import AdminManageApiKeyCreateCustomComponentCustom from "./AdminManageApiKeyCreateCustom";
import { useRouter } from "next/router";
import { setShowFullPage } from "../../../redux/features/loading_full_page/LoadingFullPage-Slice";
import { useAppDispatch } from "../../../redux/hook";
import { FormControlLabel } from "../../mui";
import SwitchToggleCustom from "../../customs/SwitchToggleCustom";
import { LocalStorageAuthService } from "../../../services/LocalStorageService";
import UserAccessGuardComponentComponent from "../../customs/UserAccessGuardComponent";
import { IConfigApiGroupsManagements } from "../../../interfaces/configs/IConfigTransaction.interface";
const AdminManageApiKeyMainComponent = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [allManageApiKeysUser, setAllManageApiKeysUser] = useState<
    IAdminManageApiKey[]
  >([]);
  const [allApiGroupManagement, setAllApiGroupManagement] =
    useState<IConfigApiGroupsManagements>();
  useEffect(() => {
    if (!router.isReady && !router.query.id) return;
    (async () => {
      await autoLoadAndUpdateApiKeys();
    })();
  }, [router.isReady]);
  const autoLoadAndUpdateApiKeys = async () => {
    dispatch(setShowFullPage({ active: true }));
    try {
      setAllApiGroupManagement(
        (await (
          await ApiService()
            .apiGroupsManagement()
            .getApiGroupsManagement(0, 0, "", "")
        ).data) as IConfigApiGroupsManagements
      );
      setAllManageApiKeysUser(
        await (
          await ApiService()
            .manageApiKeys()
            .getAllApiKeysSingleUser(router.query.id as string)
        ).data
      );
    } catch (error) {
      return error;
    }
    dispatch(setShowFullPage({ active: false }));
  };
  const handleOnChangeToggleActiveOrNotActiveApiToken = async (
    checked: boolean,
    idToken: string
  ) => {
    dispatch(setShowFullPage({ active: true }));
    try {
      setAllManageApiKeysUser((data) => {
        return data.map((item) => {
          return item.id == idToken ? { ...item, active: checked } : item;
        });
      });
      await (
        await ApiService().manageApiKeys().reUpdateApiKeyForActivate(
          {
            active: checked,
          },
          idToken
        )
      ).data;
      await autoLoadAndUpdateApiKeys();
    } catch (error) {
      return error;
    }
    dispatch(setShowFullPage({ active: false }));
  };
  return (
    <div>
      <div className="my-5">
        <UserAccessGuardComponentComponent
          showOrHidden={
            LocalStorageAuthService().getUserAccessLevels().users.listing.edit
              .credentialAssignment
          }
        >
          <AdminManageApiKeyAssignLandBankComponent />
        </UserAccessGuardComponentComponent>
      </div>
      <AdminManageApiKeyCreateCustomComponentCustom
        callbackUpdateListApiKeys={async () => await autoLoadAndUpdateApiKeys()}
      />
      <AccordionCustom
        showOrHidden={allManageApiKeysUser.length >= 1 ? true : false}
      >
        <>
          {allManageApiKeysUser?.map((item, index) => {
            return (
              <AccordionItemCustom
                key={index}
                content={
                  <AdminManageApiKeyBoxListComponent
                    callbackUpdateListApiKeys={async () =>
                      await autoLoadAndUpdateApiKeys()
                    }
                    idEndpointGroupId={item.endpointGroupId.id}
                    idApiKey={item.id}
                    allApiGroupManagement={
                      allApiGroupManagement as IConfigApiGroupsManagements
                    }
                    listEndpoints={item.endpointGroupId.endpoints}
                  />
                }
                heading={
                  <div className="flex items-center w-full justify-between">
                    <p>{item.token.slice(0, 10) + "..."}</p>
                    <div className="flex items-center">
                      <FormControlLabel
                        control={
                          <SwitchToggleCustom
                            onChange={(event) =>
                              handleOnChangeToggleActiveOrNotActiveApiToken(
                                event.target.checked,
                                item.id
                              )
                            }
                            value={item.active}
                            checked={item.active}
                          />
                        }
                        label=""
                      />
                      <AdminManageApiKeyRegenerateComponent
                        callbackUpdateListApiKeys={async () =>
                          await autoLoadAndUpdateApiKeys()
                        }
                        idApiToken={item.id}
                        apiToken={item.token}
                      />
                    </div>
                  </div>
                }
              />
            );
          })}
        </>
      </AccordionCustom>
    </div>
  );
};

export default AdminManageApiKeyMainComponent;
