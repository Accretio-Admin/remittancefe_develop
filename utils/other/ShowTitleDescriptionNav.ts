import { routesAndTitleDescriptionNav } from "../../constants";
import { IDashboardHeadContent } from "../../interfaces/customs/ICustoms.interface";

export const ShowTitleDescriptionNav = (
  nameRoute: string
): IDashboardHeadContent =>
  routesAndTitleDescriptionNav.find(
    (item) => item.nameRoute == nameRoute
  ) as IDashboardHeadContent;
