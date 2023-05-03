import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { FormCreateUserAdminSchema } from "../../utils/yup/index";
import { ApiService } from "../../services/ApiService";
import { useRouter } from "next/router";
import { CreateRandomPassword } from "../../utils/other/CreateRandomPassword";
import { IFormAdminAdd } from "../../interfaces/formik/IFormik.interface";
import {
  EditIcon,
  InputAdornment,
  MenuItem,
  Visibility,
  VisibilityOff,
} from "../mui";
import IconButtonCustomOne from "../buttons/IconButtonCustomOne";
import { LocalStorageAuthService } from "../../services/LocalStorageService";
import { handleAccessMenuItemsRole } from "../../utils/AccessMenuItemsRole";
import InputCustomOne from "../inputs/InputCustomOne";
import ButtonCustomOne from "../buttons/ButtonCustomOne";
import WrapperInputComponent from "../inputs/WrapperInput";
import { ERole } from "../../interfaces/axios/IAxios.interface";
const AddAdminComponent = () => {
  const [eyePassword, setEyePassword] = useState<boolean>(true);
  const [eyePasswordConfirm, setEyePasswordConfirm] = useState<boolean>(false);
  const [disabledPw, setDisabledPw] = useState(true);
  const [useRandomPw, setUseRandomPw] = useState<boolean>(true);
  const [initialState, setInitialState] = useState<IFormAdminAdd>({
    email: "",
    name: "",
    password: "",
    passwordConfirmation: "",
    role: "",
  });
  const router = useRouter();
  useEffect(() => {
    const pwRandomValue: string = CreateRandomPassword();
    setInitialState((prv) => {
      return {
        ...prv,
        password: pwRandomValue,
        passwordConfirmation: pwRandomValue,
      };
    });
  }, []);
  const handleEyeAnEdit = () => {
    if (useRandomPw && eyePassword) {
      setUseRandomPw(false);
      setEyePassword(false);
    }
  };
  return (
    <Formik
      enableReinitialize={true}
      validateOnMount
      initialValues={initialState}
      validationSchema={FormCreateUserAdminSchema}
      onSubmit={async ({ name, email, password, role }, { setSubmitting }) => {
        let data = { name, email, password, role };
        try {
          await ApiService().users().createUsers(data);
          router.push("/dashboard/users");
        } catch (error) {
          return error;
        }
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
        <form onSubmit={handleSubmit} className="flex flex-col ">
          <WrapperInputComponent>
            <InputCustomOne
              colorInputCustom="nsBlack1"
              borderRadiusCustom="md"
              bgColorCustom="nsWhite1"
              fontSizeCustom="sm"
              fieldsetBorderColorCustom="nsGray1"
              placeholderColorCustom="nsBlack1"
              focusedPlaceholderColorCustom="nsBlack1"
              muiFocusedShadowCustom="nsOne"
              fullWidth
              type="text"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
              placeholder="Enter your name"
            />
          </WrapperInputComponent>
          <WrapperInputComponent>
            <InputCustomOne
              colorInputCustom="nsBlack1"
              borderRadiusCustom="md"
              bgColorCustom="nsWhite1"
              fontSizeCustom="sm"
              fieldsetBorderColorCustom="nsGray1"
              placeholderColorCustom="nsBlack1"
              focusedPlaceholderColorCustom="nsBlack1"
              muiFocusedShadowCustom="nsOne"
              fullWidth
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              placeholder="Enter your email"
            />
          </WrapperInputComponent>
          <WrapperInputComponent>
            <InputCustomOne
              colorInputCustom="nsBlack1"
              borderRadiusCustom="md"
              bgColorCustom="nsWhite1"
              fontSizeCustom="sm"
              fieldsetBorderColorCustom="nsGray1"
              placeholderColorCustom="nsBlack1"
              focusedPlaceholderColorCustom="nsBlack1"
              muiFocusedShadowCustom="nsOne"
              fullWidth
              disabled={disabledPw}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <div>
                      <IconButtonCustomOne
                        edge="end"
                        onClick={() => setDisabledPw(!disabledPw)}
                      >
                        <EditIcon />
                      </IconButtonCustomOne>
                    </div>
                    <div className="mr-5">
                      <IconButtonCustomOne
                        onClick={() => {
                          setEyePassword(!eyePassword);
                          setUseRandomPw(false);
                        }}
                        edge="end"
                      >
                        {eyePassword ? <Visibility /> : <VisibilityOff />}
                      </IconButtonCustomOne>
                    </div>
                  </InputAdornment>
                ),
              }}
              type={`${eyePassword ? "text" : "password"}`}
              value={values.password}
              placeholder="Enter your password"
              onChange={(e) => {
                handleEyeAnEdit();
                handleChange(e);
              }}
              name="password"
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />
          </WrapperInputComponent>
          <WrapperInputComponent>
            <InputCustomOne
              colorInputCustom="nsBlack1"
              borderRadiusCustom="md"
              bgColorCustom="nsWhite1"
              fontSizeCustom="sm"
              fieldsetBorderColorCustom="nsGray1"
              placeholderColorCustom="nsBlack1"
              focusedPlaceholderColorCustom="nsBlack1"
              muiFocusedShadowCustom="nsOne"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <div className="mr-5">
                      <IconButtonCustomOne
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
                      </IconButtonCustomOne>
                    </div>
                  </InputAdornment>
                ),
              }}
              disabled={disabledPw}
              fullWidth
              type={`${eyePasswordConfirm ? "text" : "password"}`}
              value={values.passwordConfirmation}
              placeholder="Enter your confirm password"
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
          <WrapperInputComponent>
            <InputCustomOne
              colorInputCustom="nsBlack1"
              borderRadiusCustom="md"
              bgColorCustom="nsWhite1"
              fontSizeCustom="sm"
              fieldsetBorderColorCustom="nsGray1"
              placeholderColorCustom="nsBlack1"
              focusedPlaceholderColorCustom="nsBlack1"
              muiFocusedShadowCustom="nsOne"
              fullWidth
              select
              SelectProps={{ MenuProps: { disableScrollLock: true } }}
              type="text"
              name="role"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.role}
              placeholder="Enter your role"
              error={touched.role && Boolean(errors.role)}
              helperText={touched.role && errors.role}
            >
              {handleAccessMenuItemsRole(
                !LocalStorageAuthService().getUserAccessLevels().users.listing
                  .add.role
                  ? (LocalStorageAuthService().getUser()?.user.role as ERole)
                  : "initialsuperadmin"
              )?.map((item, index) => {
                return (
                  <MenuItem key={index} value={item as string}>
                    Role&nbsp;&nbsp;&nbsp;&nbsp;{item}
                  </MenuItem>
                );
              })}
            </InputCustomOne>
          </WrapperInputComponent>

          <div className="mt-10">
            <ButtonCustomOne
              disabledOpacityValue="0.5"
              boxShadowCustom="nsTwo"
              sizeBorderRadius="md"
              sizeHeight="md"
              bgColorCustom="nsLightningYellow1"
              dropShadowCustom="nsOne"
              colorTextCustom="nsWhite1"
              variant="contained"
              className="w-full"
              size="large"
              type="submit"
              disabled={!(isValid && dirty) || isSubmitting}
            >
              Create
            </ButtonCustomOne>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default AddAdminComponent;
