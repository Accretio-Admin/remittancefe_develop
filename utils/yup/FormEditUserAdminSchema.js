import { Yup } from ".";
import { UserHelpRoleManageService } from "../../services/UserHelpRoleManageService";

export const FormEditUserAdminSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too short!")
    .max(50, "Too long!")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(
    8,
    "Password is too short - should be 8 chars minimum."
  ),
  role: Yup.string()
    .oneOf(UserHelpRoleManageService().getAllRoles())
    .required("Role is required"),
});
