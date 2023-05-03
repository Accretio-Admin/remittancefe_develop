import { IUserAccessLevels } from "../interfaces/user/IUser.interface";
import { itemsDrawerStatic } from "../constants";
import {
  IDestructuringAccessLevelsUsers,
  IUserAccessLevelSideBarDrawer,
} from "../interfaces/user/IUserAccessLevel.interface";
import { LocalStorageSidebarDrawerService } from "./LocalStorageService";
const UserAccessLevelManageService = () => {
  const setAccessSideBarDrawer = (listAccessLevel: IUserAccessLevels) => {
    let accessLevelsUsersDes: IDestructuringAccessLevelsUsers[] = [];
    for (const [key, value] of Object.entries(listAccessLevel.accessLevel)) {
      accessLevelsUsersDes.push({ accessName: key, accessPath: value.main });
    }
    let dataFinal: IUserAccessLevelSideBarDrawer[] = itemsDrawerStatic.filter(
      (item1) => {
        return accessLevelsUsersDes.find(
          (item2) => item2.accessName == item1.accessName && item2.accessPath
        );
      }
    );
    LocalStorageSidebarDrawerService().setSidebarDrawer(dataFinal);
  };
  return { setAccessSideBarDrawer };
};

export { UserAccessLevelManageService };
