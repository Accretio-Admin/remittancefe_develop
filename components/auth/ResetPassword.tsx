import { Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { IFormAuthResetPassword } from "../../interfaces/formik/IFormik.interface";
import { setShowFullPage } from "../../redux/features/loading_full_page/LoadingFullPage-Slice";
import { setShowSnackBar } from "../../redux/features/snack_bar_msg/SnackBarMsg-Slice";
import { useAppDispatch } from "../../redux/hook";
import { ApiService } from "../../services/ApiService";
import { FormResetPasswordSchema } from "../../utils/yup";
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
const ResetPasswordComponent = ({ token }: { token: string }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [eyePassword, setEyePassword] = useState<boolean>(false);
  const [eyePasswordConfirm, setEyePasswordConfirm] = useState<boolean>(false);
  const [initialState, setInitialState] = useState<IFormAuthResetPassword>({
    password: "",
    passwordConfirmation: "",
  });
  return (
    <Formik
      initialValues={initialState}
      enableReinitialize={true}
      validateOnMount
      validationSchema={FormResetPasswordSchema}
      onSubmit={async ({ password }, { setSubmitting }) => {
        try {
          dispatch(setShowFullPage({ active: true }));
          await (
            await ApiService()
              .auth()
              .resetPassword({ password: password, token: token })
          ).data;
          router.replace("/auth/login");
          dispatch(
            setShowSnackBar({
              msg: "Password has changed !",
              openMsg: true,
              severity: "success",
              timeAutoHide: 3000,
              anchorOriginPositions:{horizontal:"right",vertical:"bottom"}
            })
          );
        } catch (error) {
          return error;
        }
        dispatch(setShowFullPage({ active: false }));
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
              {
                name: "RESET PASSWORD",
                activeLine: true,
                href: "/auth/reset-password",
              },
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
              Save New Password
            </ButtonCustomOne>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default ResetPasswordComponent;
