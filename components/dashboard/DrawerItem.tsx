import React from "react";
import { IUserAccessLevelSideBarDrawer } from "../../interfaces/user/IUserAccessLevel.interface";
import ActiveLink from "../customs/ActiveLinkCustom";
import IconDynamicMuiCustom from "../customs/IconDynamicMui";
import DrawerItemSubComponent from "./DrawerItemSub";
const DrawerItemComponent = ({ ...props }: IUserAccessLevelSideBarDrawer) => {
  let { name, routeName, iconName, disabled, subMenu } = props;
  const active = () => {
    if (subMenu.length >= 1) {
      return subMenuItem();
    } else {
      return menuItemDefault();
    }
  };
  const menuItemDefault = () => {
    return (
      <ActiveLink
        prefetch={false}
        activeClassName="bg-nsBlack1/20 h-[40px] max-h-[40px] min-h-[40px] before:absolute before:bg-black before:w-[3px] before:h-[inherit]  before:left-0 before:content-['']"
        href={`/dashboard${routeName}`}
      >
        <a className="nav-link flex items-center w-full px-5  h-[40px] max-h-[40px] min-h-[40px]">
          <IconDynamicMuiCustom iconName={iconName} />
          <p className="pl-3 my-0 text-sm font-semibold  text-nsBlack1">
            {name}
          </p>
        </a>
      </ActiveLink>
    );
  };
  const subMenuItem = () => {
    return <DrawerItemSubComponent {...props} />;
  };
  const notActive = () => {
    return (
      <p className="m-0 cursor-not-allowed opacity-50 nav-link flex items-center w-full px-5  h-[40px] max-h-[40px] min-h-[40px]">
        <IconDynamicMuiCustom iconName={iconName} />
        <span className="pl-3 my-0 text-sm font-semibold  text-nsBlack1">
          {name}
        </span>
      </p>
    );
  };
  return disabled ? notActive() : active();
};

export default DrawerItemComponent;
