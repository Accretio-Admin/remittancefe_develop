import { IAuthSaveEmailPasswordRemember } from "../interfaces/localstorage/ILocalStorage.interface";

export const LocalStorageAuthSaveEmailPasswordRememberService = () => {
  const setAuthSaveEmailPassword = (data:IAuthSaveEmailPasswordRemember) => {
    localStorage.setItem("auth_save_remember_email_pw", JSON.stringify(data));
  };
  const getAuthSaveEmailPassword = () => {
    let notAuthSaveEmailPwPars = localStorage.getItem("auth_save_remember_email_pw");
    if (typeof notAuthSaveEmailPwPars === "string") {
      return JSON.parse(notAuthSaveEmailPwPars) ;
    }
  };
  const removeAuthSaveEmailPassword = () => localStorage.removeItem("auth_save_remember_email_pw");
  return {
    setAuthSaveEmailPassword,
    getAuthSaveEmailPassword,
    removeAuthSaveEmailPassword
  };
};

