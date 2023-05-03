import { Formik } from "formik";
import React, { useState } from "react";
import { IFormAuthForgotPassword } from "../../interfaces/formik/IFormik.interface";
import { setShowFullPage } from "../../redux/features/loading_full_page/LoadingFullPage-Slice";
import { setShowSnackBar } from "../../redux/features/snack_bar_msg/SnackBarMsg-Slice";
import { useAppDispatch } from "../../redux/hook";
import { ApiService } from "../../services/ApiService";
import { FormForgotPasswordSchema } from "../../utils/yup";
import ButtonCustomOne from "../buttons/ButtonCustomOne";
import InputCustomOne from "../inputs/InputCustomOne";
import WrapperInputComponent from "../inputs/WrapperInput";
import AuthBoxItemComponent from "./AuthBoxItem";

const ForgotPasswordComponent = () => {
  const dispatch = useAppDispatch();
  const [initialState, setInitialState] = useState<IFormAuthForgotPassword>({
    email: "",
  });
  return (
    <Formik
      enableReinitialize={true}
      validateOnMount
      initialValues={initialState}
      validationSchema={FormForgotPasswordSchema}
      onSubmit={async ({ email }, { setSubmitting }) => {
        try {
          dispatch(setShowFullPage({ active: true }));
          await (
            await ApiService().auth().forgotPassword(email)
          ).data;
          dispatch(
            setShowSnackBar({
              msg: "Please check your email!",
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
                name: "FORGOT PASSWORD",
                activeLine: true,
                href: "/auth/forgotpassword",
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
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Please enter your email"
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
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
              Continue
            </ButtonCustomOne>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default ForgotPasswordComponent;
