import { useEffect, useRef, useState } from "react";
import { KeyboardArrowDownIcon, KeyboardArrowUpIcon } from "../../mui";
import styled from "../../../styles/sharedSelectedProject.module.css";
import { ApiService } from "../../../services/ApiService";
import {
  IRateLimiterAddRegion,
  IRateLimiterRegionSelectValue,
  IRegionRestCountries,
} from "../../../interfaces/rate_limiter/IRateLimiter.interface";
import Image from "next/image";
import ModalCustomComponent from "../../customs/ModalCustom";
import { useAppDispatch } from "../../../redux/hook";
import { setShowFullPage } from "../../../redux/features/loading_full_page/LoadingFullPage-Slice";
const RateRegionAddComponent = ({
  updatedListForAddRegion,
}: {
  updatedListForAddRegion: () => void;
}) => {
  const dispatch = useAppDispatch();
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  const [showOrOffModalAddCountry, setShowOrOffModalAddCountry] =
    useState<boolean>(false);
  const [addEventTemp, setAddEventTemp] =
    useState<IRateLimiterRegionSelectValue>({
      value: "US",
      icon: "",
      label: "",
    });
  const [flagOptions, setFlagOptions] =
    useState<IRateLimiterRegionSelectValue[]>();
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node) &&
        setOpenMenu(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);
  // Special
  useEffect(() => {
    (async () => {
      await setAllFlag();
    })();
  }, []);
  const setAllFlag = async () => {
    try {
      let result = (await (
        await ApiService().other().regionIcons()
      ).data) as IRegionRestCountries[];
      let resultConvert: IRateLimiterRegionSelectValue[] = result.map(
        (item) => {
          return {
            label: item.alpha2Code,
            value: item.alpha2Code,
            icon: item.flags.svg,
          };
        }
      );
      setFlagOptions(resultConvert);
    } catch (error) {
      return error;
    }
  };
  // End Special
  const handleSelectValue = (data: IRateLimiterRegionSelectValue) => {
    setAddEventTemp(data);
    setShowOrOffModalAddCountry(true);
    handleOpenMenu(false);
  };
  const handleOpenMenu = (valueBoolean: boolean) => {
    setOpenMenu(valueBoolean);
  };
  const handleRotationArrow = () => {
    return openMenu ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />;
  };
  const handleStyle = () => {
    const openAndCloseHeightContainer = () =>
      !openMenu ? styled.openMenu : styled.closeMenu;
    return { openAndCloseHeightContainer };
  };
  const handleSelect = async (newSelections: IRateLimiterRegionSelectValue) => {
    dispatch(setShowFullPage({ active: true }));
    try {
      let convertToAdd: IRateLimiterAddRegion = {
        countryCode: newSelections.value as string,
        flag: newSelections.icon as string,
      };
      await ApiService().regions().addRegion(convertToAdd);
      updatedListForAddRegion();
    } catch (error) {
      return error;
    }
    dispatch(setShowFullPage({ active: false }));
    setShowOrOffModalAddCountry(false);
  };
  return (
    <div
      ref={wrapperRef}
      className={`${handleStyle().openAndCloseHeightContainer()} ${!openMenu ? "p-3":""} bg-nsConcrete1  w-[190px] shadow-nsTwo flex items-start flex-col justify-center rounded-nsMd mr-5`}
    >
      {!openMenu && (
        <div
          onClick={() => handleOpenMenu(!openMenu)}
          className="flex items-center w-full cursor-pointer "
        >
          <p className="text-sm m-0 font-medium  w-full">Country</p>
          {handleRotationArrow()}
        </div>
      )}
      {openMenu && (
        <>
          <ul className="m-0 p-0 list-none  max-h-[211px] overflow-auto">
            {flagOptions?.map((item, indexKey) => (
              <li
                onClick={() => handleSelectValue(item)}
                key={indexKey}
                className="cursor-pointer m-3 pb-7"
              >
                <div className="flex items-center justify-start h-full">
                  <Image
                    src={item.icon}
                    width="33"
                    className="rounded-nsFull object-cover"
                    height="33"
                    alt={item.value}
                  />
                  <p className="pl-2 m-0 text-sm">
                    {regionNames.of(item.value.toUpperCase())}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
      <ModalCustomComponent
        onClickCancel={setShowOrOffModalAddCountry}
        handleOpenModalValue={showOrOffModalAddCountry}
        titleModal="Add Region"
        descriptionModal={`Are you sure that you want to add ${regionNames.of(
          addEventTemp?.value.toUpperCase()
        )} to your list?`}
        nameBtnAccept="Confirm"
        bgColorBtnAccept="nsFunGreen1"
        nameBtnCancel="Cancel"
        onClickAccept={async () => await handleSelect(addEventTemp)}
      />
    </div>
  );
};
export default RateRegionAddComponent;
