import { MuiIcons } from "../../components/mui";

interface IUserAccessLevelSideBarDrawer {
  name: string;
  iconName: keyof typeof MuiIcons;
  nameTooltip: string;
  secretName: string;
  nameModule: string;
  routeName: string;
  accessName: string;
  disabled: boolean;
  subMenu: Array<IUserAccessLevelSideBarDrawerSubMenu>;
}
interface IUserAccessLevelSideBarDrawerSubMenu
  extends IUserAccessLevelSideBarDrawer {}
interface IDestructuringAccessLevelsUsers {
  accessName: string;
  accessPath: boolean;
}
export type { IUserAccessLevelSideBarDrawer, IDestructuringAccessLevelsUsers };
