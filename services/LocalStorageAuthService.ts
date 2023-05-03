import { IUser } from "../interfaces/user/IUser.interface";

export const LocalStorageAuthService = () => {
  const setUser = (user: IUser) => {
    localStorage.setItem("user", JSON.stringify(user));
  };
  const getUser = () => {
    let notUserPars = localStorage.getItem("user");
    if (typeof notUserPars === "string") {
      return JSON.parse(notUserPars) as IUser;
    }
  };
  const removeUser = () => localStorage.removeItem("user");
  const getUserAccessLevels = () => {
    return (getUser() as IUser).user.accessLevels.accessLevel;
  };
  return {
    setUser,
    getUser,
    removeUser,
    getUserAccessLevels,
  };
};
