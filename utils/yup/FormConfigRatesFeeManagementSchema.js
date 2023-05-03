import { Yup } from ".";

export const FormConfigRatesFeeManagementSchema = Yup.object().shape({
  percentage: Yup.object().shape({
    value: Yup.number().required("Preengage is required"),
    active: Yup.bool(),
  }),
  markup: Yup.object().shape({
    value: Yup.number().required("Markup is required"),
    active: Yup.bool(),
  }),
});
