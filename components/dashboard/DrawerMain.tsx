import React from "react";
import { IUserAccessLevelSideBarDrawer } from "../../interfaces/user/IUserAccessLevel.interface";
import { LocalStorageSidebarDrawerService } from "../../services/LocalStorageService";
import DrawerItemComponent from "./DrawerItem";

const DrawerMainComponent = () => {
  return (
    <div className="flex items-center justify-center flex-col relative">
      {(
        LocalStorageSidebarDrawerService().getSidebarDrawer() as IUserAccessLevelSideBarDrawer[]
      ).map((itemDraw, indexItemDraw) => {
        return <DrawerItemComponent key={indexItemDraw} {...itemDraw} />;
      })}
    </div>
  );
};

export default DrawerMainComponent;
