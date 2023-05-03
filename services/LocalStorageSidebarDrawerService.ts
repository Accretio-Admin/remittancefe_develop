import { IUserAccessLevelSideBarDrawer } from "../interfaces/user/IUserAccessLevel.interface";

export const LocalStorageSidebarDrawerService = () => {
  const setSidebarDrawer = (sidebarDrawerItems: IUserAccessLevelSideBarDrawer[]) => {
    localStorage.setItem(
      "sidebar_drawer_access_level",
      JSON.stringify(sidebarDrawerItems)
    );
  };
  const getSidebarDrawer = () => {
    let notSidebarDrawerPars = localStorage.getItem("sidebar_drawer_access_level");
    if (typeof notSidebarDrawerPars === "string") {
      return JSON.parse(notSidebarDrawerPars) as IUserAccessLevelSideBarDrawer[];
    }
  };
  const removeSidebarDrawer = () => localStorage.removeItem("sidebar_drawer_access_level");
  return {
    setSidebarDrawer,
    removeSidebarDrawer,
    getSidebarDrawer
  };
};
