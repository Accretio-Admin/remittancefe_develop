import { useEffect, useRef, useState } from "react";
import {
  CheckCircleIcon,
  KeyboardArrowDownIcon,
  KeyboardArrowUpIcon,
} from "../mui";
import styled from "../../styles/sharedSelectedProject.module.css";
import { Colors } from "../../utils/colors";
import { listProjectFake } from "../../constants";
import { ISharedSelectProject } from "../../interfaces/shared/IShared.interface";
const SharedSelectProjectComponent = () => {
  const [valueSelected, setValueSelected] = useState<ISharedSelectProject>({
    active: false,
    nameProject: "Remittance",
    nameSecret: "remittance",
  });
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event:MouseEvent) {
      wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node) &&
        setOpenMenu(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);
  const handleSelectValue = (nameValue: ISharedSelectProject) => {
    setValueSelected(nameValue);
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
  const handleActiveProject = (data: ISharedSelectProject) => {
    return (
      <li className="py-2 cursor-pointer flex items-center">
        <p className="text-sm m-0 font-medium whitespace-nowrap text-nsChateauGreen1">
          {data.nameProject}
        </p>
        <CheckCircleIcon
          sx={{ color: Colors.nsChateauGreen1 }}
          className="mx-3 "
          fontSize="small"
        />
      </li>
    );
  };
  const handleNotActiveProject = (data: ISharedSelectProject) => {
    return (
      <li
        onClick={() => handleSelectValue(data)}
        className="py-2 cursor-pointer"
      >
        <p className="text-sm font-medium m-0 text-nsDoveGray1">
          {data.nameProject}
        </p>
      </li>
    );
  };
  return (
    <div
      ref={wrapperRef}
      className={`${handleStyle().openAndCloseHeightContainer()} bg-nsConcrete1 p-3 w-[160px] shadow-nsTwo flex items-start flex-col justify-center rounded-nsMd`}
    >
      <div
        onClick={() => handleOpenMenu(!openMenu)}
        className="flex items-center w-full cursor-pointer "
      >
        <p className="text-sm m-0 font-medium  w-full">
          {valueSelected.nameProject}
        </p>
        {handleRotationArrow()}
      </div>
      {openMenu && (
        <>
          <div className="w-full my-2 bg-nsSwissCoffee1 h-[1px]" />
          <ul className="m-0 list-none p-0">
            {listProjectFake.map((item, indexKey) => (
              <div key={indexKey}>
                {item.nameSecret == valueSelected.nameSecret
                  ? handleActiveProject(item)
                  : handleNotActiveProject(item)}
              </div>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
export default SharedSelectProjectComponent;
