import { authPathsGuard } from "../constants/PathsList";
import { IRouteValid } from "../interfaces/router/IRouter.interface";
import { JwtService } from "./JwtService";

const accessPatchDashboard = (path: string): IRouteValid => {
  return {
    value:
      path.includes("/dashboard") &&
      !JwtService().handleValidJwt().refreshToken(),
    nameRoute: "/auth/login",
  };
};

const accessPatchAuthLoginRegisterDigitNumber = (path: string): IRouteValid => {
  return {
    value:
      authPathsGuard.includes(path) &&
      JwtService().handleValidJwt().refreshToken(),
    nameRoute: "/dashboard",
  };
};
export { accessPatchDashboard, accessPatchAuthLoginRegisterDigitNumber };
