import React, { useLayoutEffect, useState } from "react";
import { Formik } from "formik";
import { FormLoginSchema } from "../../utils/yup/index";
import { useRouter } from "next/router";
import { IUser } from "../../interfaces/user/IUser.interface";
import { ApiService } from "../../services/ApiService";
import {
  LocalStorageAuthRememberMeService,
  LocalStorageAuthSaveEmailPasswordRememberService,
  LocalStorageAuthService,
  LocalStorageUserLogger,
} from "../../services/LocalStorageService";
import RememberMeComponent from "./RememberMe";
import { IFormAuthLoginRemember } from "../../interfaces/formik/IFormik.interface";
import { useAppDispatch } from "../../redux/hook";
import { setShowFullPage } from "../../redux/features/loading_full_page/LoadingFullPage-Slice";
import ButtonCustomOne from "../buttons/ButtonCustomOne";
import InputCustomOne from "../inputs/InputCustomOne";
import {
  InputAdornment,
  IconButton,
  Visibility,
  VisibilityOff,
} from "../mui/index";
import LinksCustom from "../customs/LinksCustom";
import AuthBoxItemComponent from "./AuthBoxItem";
import WrapperInputComponent from "../inputs/WrapperInput";
import { UserAccessLevelManageService } from "../../services/UserAccessLevelManageService";
import { setShowSnackBar } from "../../redux/features/snack_bar_msg/SnackBarMsg-Slice";
const LoginComponent = () => {
  const dispatch = useAppDispatch();
  const [eyePassword, setEyePassword] = useState<boolean>(false);
  const [initialState, setInitialState] = useState<IFormAuthLoginRemember>({
    email: "",
    password: "",
  });
  const [initialTouched, setInitialTouched] = useState({
    email: true,
    password: true,
  });
  const router = useRouter();
  useLayoutEffect(() => {
    if (
      LocalStorageAuthRememberMeService().getRememberMe() &&
      LocalStorageAuthSaveEmailPasswordRememberService().getAuthSaveEmailPassword() !==
        undefined
    ) {
      let { email, password } =
        LocalStorageAuthSaveEmailPasswordRememberService().getAuthSaveEmailPassword() as IFormAuthLoginRemember;
      setInitialState({ email: email, password: password });
      setInitialTouched({ email: true, password: true });
    } else {
      setInitialState({ email: "", password: "" });
      setInitialTouched({ email: false, password: false });
    }
  }, []);
  return (
    <Formik
      enableReinitialize={true}
      validateOnMount
      initialTouched={initialTouched}
      initialValues={initialState}
      validationSchema={FormLoginSchema}
      onSubmit={async ({ email, password }, { setSubmitting }) => {
        let data = { email, password };
        dispatch(setShowFullPage({ active: true }));
        try {
          let user: IUser = await (await ApiService().auth().login(data)).data;
          LocalStorageUserLogger().setLogger(await (await ApiService().logs().createLog()).data)
          const {
            user: { role },
          } = user;
          if (role == "agent") {
            dispatch(setShowFullPage({ active: false }));
            setSubmitting(false);
            return dispatch(
              setShowSnackBar({
                msg: "Incorrect email or password",
                openMsg: true,
                severity: "error",
                timeAutoHide: 3000,
              })
            );
          } else {
            LocalStorageAuthRememberMeService().handleCheckAuthRemember(data);
            UserAccessLevelManageService().setAccessSideBarDrawer(
              user.user.accessLevels
            );
            LocalStorageAuthService().setUser(user);
            router.replace("/dashboard/logs");
          }
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
      }) => (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full  items-center"
        >
          <AuthBoxItemComponent
            classWrapperOne="w-1/2 h-full min-h-[570px] "
            classWrapperTwo="w-full max-w-[326px]"
            itemHeads={[
              { name: "LOGIN", activeLine: true, href: "/auth/login" },
              { name: "SIGNUP", activeLine: false, href: "/auth/register" },
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
              <div className="flex justify-between items-center">
                <RememberMeComponent />
                <div className="text-nsBlue1 text-sm underline">
                  <LinksCustom
                    nameLink="Forget Password"
                    href="/auth/forgotpassword"
                  />
                </div>
              </div>
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
              disabled={!isValid || isSubmitting}
            >
              Login
            </ButtonCustomOne>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default LoginComponent;
