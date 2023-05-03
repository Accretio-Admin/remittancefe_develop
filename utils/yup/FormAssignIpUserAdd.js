import { Yup } from ".";
import ipRegex from "../other/ipRegex";
export const FormAssignIpUserAddSchema = Yup.object().shape({
  value: Yup.string()
    .required("Required Ip Address")
    .test(
      "is-tea",
      "Invalid Ip Address",
      (value) => ipRegex().test(value) || value == "all"
    ),
});
