import { Yup } from ".";

export const FormFilterUsersSchema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string(),
  role: Yup.string(),
});
