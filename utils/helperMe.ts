import {
  ERole,
  ERoleReadable,
  IRoles,
} from "../interfaces/axios/IAxios.interface";
import { LocalStorageAuthService } from "../services/LocalStorageService";
import { removeLocalStorageUserAndRedirect } from "../services/LogoutUserService";

const helperThisUserIsMe = () => {
  const checkById = (id: string): boolean =>
    LocalStorageAuthService().getUser()?.user.id == id ? true : false;
  const checkByEmail = (email: string): boolean =>
    LocalStorageAuthService().getUser()?.user.email == email ? true : false;
  const checkByRole = ({ role }: IRoles): boolean =>
    LocalStorageAuthService().getUser()?.user.role == role ? true : false;
  const checkLockedMe = (email: string) =>
    checkByEmail(email) && removeLocalStorageUserAndRedirect();
  const showMyNameRole = (): string =>
    ERoleReadable[LocalStorageAuthService().getUser()?.user.role as ERole];
  const showNameRoleRealDynamic = (nameRole:keyof typeof ERole): string =>
    ERoleReadable[nameRole];
  return {
    checkById,
    checkByEmail,
    checkByRole,
    checkLockedMe,
    showMyNameRole,
    showNameRoleRealDynamic
  };
};
export { helperThisUserIsMe };
