import { ERole } from "../interfaces/axios/IAxios.interface";

const UserHelpRoleManageService = () => {
  const getAllRoles = (): Array<String> => Object.keys(ERole);
  const removeSpecialRoleInAllRoles = (nameRole:Array<keyof typeof ERole>): Array<String> =>
    Object.keys(ERole).filter((item) => !nameRole.includes(item as ERole));
  return { getAllRoles, removeSpecialRoleInAllRoles };
};

export { UserHelpRoleManageService };
