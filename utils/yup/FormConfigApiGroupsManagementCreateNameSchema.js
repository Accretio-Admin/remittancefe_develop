import { Yup } from ".";

export const FormConfigApiGroupsManagementCreateNameSchema = Yup.object().shape({
  name:
    Yup.string()
    .required("Name is required"),
});
