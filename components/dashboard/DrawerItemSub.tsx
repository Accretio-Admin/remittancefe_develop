import { useRouter } from "next/router";
import React, { useState } from "react";
import { IUserAccessLevelSideBarDrawer } from "../../interfaces/user/IUserAccessLevel.interface";
import ActiveLink from "../customs/ActiveLinkCustom";
import IconDynamicMuiCustom from "../customs/IconDynamicMui";
import { KeyboardArrowDownIcon, KeyboardArrowRightIcon } from "../mui";

const DrawerItemSubComponent = ({
  name,
  subMenu,
  iconName,
}: IUserAccessLevelSideBarDrawer) => {
  const router = useRouter();
  const activeAutoSub = () => {
    return subMenu.find(
      (item) => router.pathname == `/dashboard${item.routeName}`
    )
      ? true
      : false;
  };
  const [expends, setExpends] = useState(activeAutoSub());

  return (
    <>
      <div
        onClick={() => setExpends(!expends)}
        className=" cursor-pointer nav-link flex items-center w-full px-5  h-[40px] max-h-[40px] min-h-[40px]"
      >
        <p className="m-0 flex w-full">
          <IconDynamicMuiCustom iconName={iconName} />
          <span className="pl-3 my-0 text-sm font-semibold  text-nsBlack1">
            {name}
          </span>
        </p>
        {expends ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
      </div>
      {expends &&
        subMenu.map((item, index) => {
          return (
            <ActiveLink
              key={index}
              prefetch={false}
              activeClassName="bg-nsBlack1/20 h-[40px] max-h-[40px] min-h-[40px] before:absolute before:bg-black before:w-[3px] before:h-[inherit]  before:left-0 before:content-['']"
              href={`/dashboard${item.routeName}`}
            >
              <a className="nav-link flex items-center w-full pl-[55px]  h-[40px] max-h-[40px] min-h-[40px]">
                <IconDynamicMuiCustom iconName={item.iconName} />
                <p className="pl-3 my-0 text-sm font-semibold  text-nsBlack1">
                  {item.name}
                </p>
              </a>
            </ActiveLink>
          );
        })}
    </>
  );
};

export default DrawerItemSubComponent;
