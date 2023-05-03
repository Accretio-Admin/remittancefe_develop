import React, { useEffect, useState } from "react";
import {
  IRateLimierRegionsList,
  IRateLimierResult,
} from "../../../interfaces/rate_limiter/IRateLimiter.interface";
import { setShowSnackBar } from "../../../redux/features/snack_bar_msg/SnackBarMsg-Slice";
import { useAppDispatch } from "../../../redux/hook";
import { ApiService } from "../../../services/ApiService";
import RateRegionAddComponent from "./RateRegionAdd";
import RateRegionItemsComponent from "./RateRegionItems";
import UserAccessGuardComponentComponent from "../../customs/UserAccessGuardComponent";
import { LocalStorageAuthService } from "../../../services/LocalStorageService";
import ItemBoxTitleAnDescriptionAndLabelCustomComponent from "../../customs/ItemBoxTitleAnDescriptionAndLabelCustom";
import ModalCustomComponent from "../../customs/ModalCustom";
import { setShowFullPage } from "../../../redux/features/loading_full_page/LoadingFullPage-Slice";
const CRegionLimiter = () => {
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  const [dataCountryModal, setDataCountryModal] = useState<IRateLimierResult>({
    countryCode: "US",
    deleted: false,
    flag: "https://flagcdn.com/ax.svg",
    id: "0",
  });
  const dispatch = useAppDispatch();
  const [regionsArray, setRegionsArray] = useState<IRateLimierRegionsList>();
  const [showOrOffModalDelete, setShowOrOffModalDelete] =
    useState<boolean>(false);

  useEffect(() => {
    (async () => {
      await autoLoadRegions();
    })();
  }, []);
  const autoLoadRegions = async () => {
    setRegionsArray(await (await ApiService().regions().getAllRegions()).data);
  };
  const removeRegionSelected = async (id: string) => {
    dispatch(setShowFullPage({ active: true }));
    let removedList: IRateLimierRegionsList = {
      ...regionsArray,
      results: regionsArray?.results.filter(
        (item) => item.id !== id
      ) as IRateLimierRegionsList["results"],
    } as IRateLimierRegionsList;
    try {
      await ApiService().regions().removeRegion(id);
      setRegionsArray(removedList);
      dispatch(
        setShowSnackBar({
          msg: "Region Removed",
          openMsg: true,
          severity: "info",
          timeAutoHide: 3000,
        })
      );
    } catch (error) {
      return error;
    }
    dispatch(setShowFullPage({ active: false }));
    setShowOrOffModalDelete(false);
  };
  const handleMsgAddAndUpdateList = async () => {
    try {
      await autoLoadRegions();
      dispatch(
        setShowSnackBar({
          msg: "Region Added",
          openMsg: true,
          severity: "success",
          timeAutoHide: 3000,
        })
      );
    } catch (error) {
      return error;
    }
  };
  return (
    <>
      <ItemBoxTitleAnDescriptionAndLabelCustomComponent
        nameLabel="Region Limiter"
        title="Region Limiter"
        description=""
      >
        <div className="flex items-center flex-wrap relative">
          <UserAccessGuardComponentComponent
            showOrHidden={
              LocalStorageAuthService().getUserAccessLevels().rateLimiter
                .listing.add.main
            }
          >
            <div className="w-[210px]">
              <div className="absolute left-0 top-[10px] z-10  ">
                <RateRegionAddComponent
                  updatedListForAddRegion={() => handleMsgAddAndUpdateList()}
                />
              </div>
            </div>
          </UserAccessGuardComponentComponent>

          {regionsArray?.results.map((item) => {
            return (
              <RateRegionItemsComponent
                key={item.id}
                onClickForRemoveRegion={() => {
                  setDataCountryModal(item);
                  setShowOrOffModalDelete(true);
                }}
                {...item}
              />
            );
          })}
          {regionsArray?.results.length == 0 && <div className=" w-full"><p className="text-nsGray1 text-center">No any country been added!</p></div>}
          <ModalCustomComponent
            onClickCancel={setShowOrOffModalDelete}
            handleOpenModalValue={showOrOffModalDelete}
            titleModal="Delete Region"
            descriptionModal={`Are you sure that you want to remove ${regionNames.of(
              dataCountryModal.countryCode.toUpperCase()
            )} to your list?`}
            nameBtnAccept="Confirm"
            nameBtnCancel="Cancel"
            onClickAccept={async () =>
              await removeRegionSelected(dataCountryModal.id)
            }
          />
        </div>
      </ItemBoxTitleAnDescriptionAndLabelCustomComponent>
    </>
  );
};

export default CRegionLimiter;
