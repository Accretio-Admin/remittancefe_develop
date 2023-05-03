import { setShowFullPage } from "../redux/features/loading_full_page/LoadingFullPage-Slice";
import { ApiService } from "./ApiService";
import {
  LocalStorageAuthService,
  LocalStorageSidebarDrawerService,
  LocalStorageUserLogger
} from "./LocalStorageService";
import Router from "next/router";
import { store } from "../provider/Store";
const removeLocalStorageUserAndRedirect = (
  nameRoute: string = "/auth/login"
) => {
  LocalStorageAuthService().removeUser();
  LocalStorageSidebarDrawerService().removeSidebarDrawer();
  LocalStorageUserLogger().removeLogger();
  Router.replace(nameRoute);
};
const LogoutUserService = async () => {
  try {
    store.dispatch(setShowFullPage({ active: true }));
    (await ApiService().logs().updateLog(LocalStorageUserLogger().getLogger()?.id as string,LocalStorageUserLogger().getCalculateExitUserLog())).data
    await ApiService()
      .auth()
      .logout({
        refreshToken: LocalStorageAuthService().getUser()?.tokens.access
          .token as string,
      });
    removeLocalStorageUserAndRedirect();
  } catch (error) {
    removeLocalStorageUserAndRedirect();
    return error;
  }
  store.dispatch(setShowFullPage({ active: false }));
};

export { LogoutUserService, removeLocalStorageUserAndRedirect };
