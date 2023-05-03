import { IAuthSaveEmailPasswordRemember } from "../interfaces/localstorage/ILocalStorage.interface";
import { LocalStorageAuthSaveEmailPasswordRememberService } from "./LocalStorageService";

export const LocalStorageAuthRememberMeService = () => {
  const setRememberMe = (value: boolean) => {
    localStorage.setItem("remember_me_auth", JSON.stringify(value));
  };
  const getRememberMe = () => {
    let notAuthRememberPars = localStorage.getItem("remember_me_auth");
    if (typeof notAuthRememberPars === "string") {
      return JSON.parse(notAuthRememberPars);
    }
  };
  const handleCheckAuthRemember = (
    dataInputs: IAuthSaveEmailPasswordRemember
  ) => {
    if (getRememberMe()) {
      LocalStorageAuthSaveEmailPasswordRememberService().setAuthSaveEmailPassword(
        dataInputs
      );
    } else {
      LocalStorageAuthSaveEmailPasswordRememberService().removeAuthSaveEmailPassword();
    }
  };
  const removeRememberMe = () => localStorage.removeItem("remember_me_auth");
  return {
    setRememberMe,
    getRememberMe,
    removeRememberMe,
    handleCheckAuthRemember,
  };
};
