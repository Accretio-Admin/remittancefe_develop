import { ERole } from "../interfaces/axios/IAxios.interface";
import { UserHelpRoleManageService } from "../services/UserHelpRoleManageService";

const handleAccessMenuItemsRole = (roleUser: keyof typeof ERole) => {
  switch (roleUser) {
    case ERole.initialsuperadmin:
      return UserHelpRoleManageService().removeSpecialRoleInAllRoles(["initialsuperadmin"]);
    case ERole.superadmin:
      return UserHelpRoleManageService().removeSpecialRoleInAllRoles(["initialsuperadmin"]);
    case ERole.admin:
      return UserHelpRoleManageService().removeSpecialRoleInAllRoles(["initialsuperadmin","superadmin","admin"]);
    case ERole.companyadmin:
      return UserHelpRoleManageService().removeSpecialRoleInAllRoles(["initialsuperadmin","superadmin","admin","companyadmin"]);
    default:
      break;
  }
};
export { handleAccessMenuItemsRole };
