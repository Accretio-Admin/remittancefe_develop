import { Yup } from ".";

export const FormResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
    passwordConfirmation: Yup.string().equalTo(Yup.ref('password'), 'Passwords must match').required('Required')
});
