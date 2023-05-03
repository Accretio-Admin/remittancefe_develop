import { Yup } from ".";
import { UserHelpRoleManageService } from "../../services/UserHelpRoleManageService";

export const FormCreateUserAdminSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too short!")
    .max(50, "Too long!")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password is too short - should be 8 chars minimum."),
  passwordConfirmation: Yup.string()
    .equalTo(Yup.ref("password"), "Passwords must match")
    .required("Required"),
  role: Yup.string()
    .oneOf(UserHelpRoleManageService().getAllRoles())
    .required("Role is required"),
});
