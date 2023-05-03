import { Yup } from ".";

export const FormConfigApiGroupsManagementCreateEndpointsSchema = Yup.object().shape({
  endpoints:
    Yup.string()
    .required("Endpoint Api is required"),
});
