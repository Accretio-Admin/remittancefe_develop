import React, { useState } from "react";
import { Formik } from "formik";
import {
  FormRegisterSchema,
  FormRegisterSchemaInCode,
} from "../../utils/yup/index";
import { ApiService, handleErrorCatch } from "../../services/ApiService";
import { useAppDispatch } from "../../redux/hook";
import { setShowSnackBar } from "../../redux/features/snack_bar_msg/SnackBarMsg-Slice";
import { useRouter } from "next/router";
import {
  IFormAuthRegister,
  IFormAuthRegisterInCodeInitializer,
} from "../../interfaces/formik/IFormik.interface";
import { setShowFullPage } from "../../redux/features/loading_full_page/LoadingFullPage-Slice";
import {
  InputAdornment,
  IconButton,
  Visibility,
  VisibilityOff,
} from "../mui/index";
import InputCustomOne from "../inputs/InputCustomOne";
import ButtonCustomOne from "../buttons/ButtonCustomOne";
import AuthBoxItemComponent from "./AuthBoxItem";
import WrapperInputComponent from "../inputs/WrapperInput";
const RegisterComponent = () => {
  const [itsSupAdminActive, setItsSupAdminActive] = useState<boolean>(false);
  type ConditionalRegisterForm<itsSupAdminActive = true> =
    itsSupAdminActive extends true
      ? IFormAuthRegisterInCodeInitializer
      : IFormAuthRegister;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [eyePassword, setEyePassword] = useState<boolean>(false);
  const [eyePasswordConfirm, setEyePasswordConfirm] = useState<boolean>(false);
  const [initialState, setInitialState] = useState<ConditionalRegisterForm>({
    email: "",
    name: "",
    password: "",
    passwordConfirmation: "",
    codeSecret: "",
  });
  return (
    <Formik
      initialValues={initialState}
      enableReinitialize={true}
      validateOnMount
      validationSchema={
        itsSupAdminActive ? FormRegisterSchemaInCode : FormRegisterSchema
      }
      onSubmit={async (
        { name, email, password, codeSecret },
        { setSubmitting, resetForm }
      ) => {
        let data = { name, email, password };
        try {
          dispatch(setShowFullPage({ active: true }));
          if (!itsSupAdminActive) {
            await (
              await ApiService().auth().register(data)
            ).data;
          } else {
            await (
              await ApiService()
                .auth()
                .registerWithCodeInitializeSuperAdmin(data, codeSecret)
            ).data;
          }
          dispatch(
            setShowSnackBar({
              msg: "Register Success!",
              openMsg: true,
              severity: "success",
              timeAutoHide: 3000,
              anchorOriginPositions:{horizontal:"right",vertical:"bottom"}
            })
          );
          router.push("/auth/login");
        } catch (error) {
          if (
            handleErrorCatch(error)?.response?.data.message ==
            "Initialization required."
          ) {
            setItsSupAdminActive(true);
            await (
              await ApiService().auth().appInitialization()
            ).data;
          }
          return error;
        }
        dispatch(setShowFullPage({ active: false }));
        resetForm();
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        isValid,
        dirty,
      }) => (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full  items-center"
        >
          <AuthBoxItemComponent
            classWrapperOne="w-1/2 h-full min-h-[570px] "
            classWrapperTwo="w-full max-w-[326px]"
            itemHeads={[
              { name: "LOGIN", activeLine: false, href: "/auth/login" },
              { name: "SIGNUP", activeLine: true, href: "/auth/register" },
            ]}
          >
            <div>
              <WrapperInputComponent wrapperOne="my-3">
                <InputCustomOne
                  colorInputCustom="nsBlack1"
                  borderRadiusCustom="3xl"
                  bgColorCustom="nsLightningYellow1"
                  fontSizeCustom="sm"
                  fieldsetBorderColorCustom="nsWhite1"
                  placeholderColorCustom="nsBlack1"
                  focusedPlaceholderColorCustom="nsBlack1"
                  muiFocusedShadowCustom="nsOne"
                  fullWidth
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  placeholder="Write your full name here"
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
              </WrapperInputComponent>
              <WrapperInputComponent wrapperOne="my-3">
                <InputCustomOne
                  colorInputCustom="nsBlack1"
                  borderRadiusCustom="3xl"
                  bgColorCustom="nsLightningYellow1"
                  fontSizeCustom="sm"
                  fieldsetBorderColorCustom="nsWhite1"
                  placeholderColorCustom="nsBlack1"
                  focusedPlaceholderColorCustom="nsBlack1"
                  muiFocusedShadowCustom="nsOne"
                  fullWidth
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Write your Email Address here"
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </WrapperInputComponent>
              <WrapperInputComponent wrapperOne="my-3">
                <InputCustomOne
                  colorInputCustom="nsBlack1"
                  borderRadiusCustom="3xl"
                  bgColorCustom="nsLightningYellow1"
                  fontSizeCustom="sm"
                  fieldsetBorderColorCustom="nsWhite1"
                  placeholderColorCustom="nsBlack1"
                  focusedPlaceholderColorCustom="nsBlack1"
                  muiFocusedShadowCustom="nsOne"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setEyePassword(!eyePassword)}
                          edge="end"
                        >
                          {eyePassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  type={`${eyePassword ? "text" : "password"}`}
                  value={values.password}
                  placeholder="Password"
                  onChange={handleChange}
                  name="password"
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
              </WrapperInputComponent>
              <WrapperInputComponent wrapperOne="my-3">
                <InputCustomOne
                  colorInputCustom="nsBlack1"
                  borderRadiusCustom="3xl"
                  bgColorCustom="nsLightningYellow1"
                  fontSizeCustom="sm"
                  fieldsetBorderColorCustom="nsWhite1"
                  placeholderColorCustom="nsBlack1"
                  focusedPlaceholderColorCustom="nsBlack1"
                  muiFocusedShadowCustom="nsOne"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setEyePasswordConfirm(!eyePasswordConfirm)
                          }
                          edge="end"
                        >
                          {eyePasswordConfirm ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  type={`${eyePasswordConfirm ? "text" : "password"}`}
                  value={values.passwordConfirmation}
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  name="passwordConfirmation"
                  onBlur={handleBlur}
                  error={
                    touched.passwordConfirmation &&
                    Boolean(errors.passwordConfirmation)
                  }
                  helperText={
                    touched.passwordConfirmation && errors.passwordConfirmation
                  }
                />
              </WrapperInputComponent>

              {itsSupAdminActive && (
                <WrapperInputComponent wrapperOne="my-3">
                  <InputCustomOne
                    colorInputCustom="nsBlack1"
                    borderRadiusCustom="3xl"
                    bgColorCustom="nsLightningYellow1"
                    fontSizeCustom="sm"
                    fieldsetBorderColorCustom="nsWhite1"
                    placeholderColorCustom="nsBlack1"
                    focusedPlaceholderColorCustom="nsBlack1"
                    muiFocusedShadowCustom="nsOne"
                    fullWidth
                    type="text"
                    name="codeSecret"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.codeSecret}
                    placeholder="Write your pass key here"
                    error={touched.codeSecret && Boolean(errors.codeSecret)}
                    helperText={touched.codeSecret && errors.codeSecret}
                  />
                </WrapperInputComponent>
              )}
            </div>
          </AuthBoxItemComponent>
          <div className="w-full max-w-[326px] my-[40px] m-auto">
            <ButtonCustomOne
              sizeBorderRadius="4xl"
              sizeHeight="md"
              bgColorCustom="nsLightningYellow1"
              dropShadowCustom="nsOne"
              colorTextCustom="nsWhite1"
              variant="contained"
              type="submit"
              className="w-full"
              size="large"
              disabled={!(isValid && dirty) || isSubmitting}
            >
              Register
            </ButtonCustomOne>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default RegisterComponent;
