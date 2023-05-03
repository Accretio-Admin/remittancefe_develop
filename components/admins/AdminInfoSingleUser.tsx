import React, { useEffect, useState } from "react";
import { IUpdateUser } from "../../interfaces/user/IUser.interface";
import { Formik } from "formik";
import { FormEditUserAdminSchema } from "../../utils/yup/index";
import { ApiService } from "../../services/ApiService";
import { IFormAdminEditUser } from "../../interfaces/formik/IFormik.interface";
import {
  InputAdornment,
  MenuItem,
  Visibility,
  VisibilityOff,
} from "../mui/index";
import { useRouter } from "next/router";
import { handleAccessMenuItemsRole } from "../../utils/AccessMenuItemsRole";
import { LocalStorageAuthService } from "../../services/LocalStorageService";
import { helperThisUserIsMe } from "../../utils/helperMe";
import UserAccessGuardComponentComponent from "../customs/UserAccessGuardComponent";
import { ERole } from "../../interfaces/axios/IAxios.interface";
import InputCustomOne from "../inputs/InputCustomOne";
import WrapperInputComponent from "../inputs/WrapperInput";
import IconButtonCustomOne from "../buttons/IconButtonCustomOne";
import ButtonCustomOne from "../buttons/ButtonCustomOne";
import ModalCustomComponent from "../customs/ModalCustom";
import { useAppDispatch } from "../../redux/hook";
import { setShowFullPage } from "../../redux/features/loading_full_page/LoadingFullPage-Slice";
const AdminInfoSingleUserComponent = () => {
  const [showOrOffModal, setShowOrOffModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [idQuery, setIdQuery] = useState<string>("");
  const [eyePassword, setEyePassword] = useState<boolean>(false);
  const [initialState, setInitialState] = useState<IFormAdminEditUser>({
    email: "",
    name: "",
    password: "",
    locked: 0,
    role: "",
  });
  useEffect(() => {
    (async () => {
      if (!router.isReady && !router.query.id) return;
      // For Scroll To See Assign If Click Button Assign In the table
      setTimeout(() => {
       if(window !== undefined && router.query.assignScroll == 'true') (document.querySelector('#assign_ip_scroll') as HTMLElement).scrollIntoView({behavior: "smooth"});
      }, 500);
      try {
        let { name, email, locked, role } = await (
          await ApiService()
            .users()
            .getSingleUsers(router.query.id as string)
        ).data;
        setInitialState((prv) => {
          return {
            ...prv,
            name,
            email,
            locked,
            role,
          };
        });
        setIdQuery(router.query.id as string);
      } catch (error) {
        router.replace("/dashboard");
        return error;
      }
    })();
  }, [router.isReady]);
  const handleDeleteUser = async () => {
    dispatch(setShowFullPage({ active: true }));
    try {
      await (
        await ApiService().users().deleteSingleUsers(idQuery)
      ).data;
      router.replace("/dashboard/users");
    } catch (error) {
      return error;
    }
    dispatch(setShowFullPage({ active: false }));
  };
  return (
    <>
      <Formik
        enableReinitialize={true}
        validateOnMount
        initialValues={initialState}
        validationSchema={FormEditUserAdminSchema}
        onSubmit={async (
          { name, email, password, locked, role },
          { setSubmitting }
        ) => {
          let data: IUpdateUser = {
            name,
            email,
            password,
            locked: locked as number,
            role,
          };
          password.length <= 0 && delete data.password;
          try {
            await ApiService().users().updateSingleUsers(idQuery, data);
            locked == 0 && helperThisUserIsMe().checkLockedMe(email);
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
            <UserAccessGuardComponentComponent
              showOrHidden={
                LocalStorageAuthService().getUserAccessLevels().users.listing
                  .edit.name
              }
            >
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
            </UserAccessGuardComponentComponent>
            <UserAccessGuardComponentComponent
              showOrHidden={
                LocalStorageAuthService().getUserAccessLevels().users.listing
                  .edit.email
              }
            >
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
            </UserAccessGuardComponentComponent>
            <UserAccessGuardComponentComponent
              showOrHidden={
                LocalStorageAuthService().getUserAccessLevels().users.listing
                  .edit.lock
              }
            >
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
                  type="number"
                  name="locked"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.locked}
                  placeholder="Type locked or unlock"
                  error={touched.locked && Boolean(errors.locked)}
                  helperText={touched.locked && errors.locked}
                >
                  <MenuItem value={0}>Lock</MenuItem>
                  <MenuItem value={-3}>Unlock</MenuItem>
                </InputCustomOne>
              </WrapperInputComponent>
            </UserAccessGuardComponentComponent>
            <UserAccessGuardComponentComponent
              showOrHidden={
                LocalStorageAuthService().getUserAccessLevels().users.listing
                  .edit.role
              }
            >
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
                    LocalStorageAuthService().getUser()?.user.role as ERole
                  )?.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item as string}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </InputCustomOne>
              </WrapperInputComponent>
            </UserAccessGuardComponentComponent>
            <UserAccessGuardComponentComponent
              showOrHidden={
                LocalStorageAuthService().getUserAccessLevels().users.listing
                  .edit.password
              }
            >
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
                  type={`${eyePassword ? "text" : "password"}`}
                  value={values.password}
                  placeholder="Enter your password"
                  name="password"
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButtonCustomOne
                          onClick={() => setEyePassword(!eyePassword)}
                          edge="end"
                        >
                          {eyePassword ? <Visibility /> : <VisibilityOff />}
                        </IconButtonCustomOne>
                      </InputAdornment>
                    ),
                  }}
                />
              </WrapperInputComponent>
            </UserAccessGuardComponentComponent>

            <div className="mt-10 flex">
              <ButtonCustomOne
                onClick={() => setShowOrOffModal(true)}
                disabledOpacityValue="0.5"
                boxShadowCustom="nsTwo"
                sizeBorderRadius="md"
                sizeHeight="md"
                bgColorCustom="nsSilverChalice2"
                dropShadowCustom="nsOne"
                colorTextCustom="nsWhite1"
                variant="contained"
                className="w-full"
                size="large"
                type="button"
              >
                Delete Account
              </ButtonCustomOne>
              <div className="mx-12" />
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
                Update
              </ButtonCustomOne>
            </div>
          </form>
        )}
      </Formik>
      <ModalCustomComponent
        classDescription="text-sm"
        onClickCancel={setShowOrOffModal}
        handleOpenModalValue={showOrOffModal}
        titleModal="You are about to delete a account"
        descriptionModal="All of your information will be delete and you wont be able to see them again "
        nameBtnAccept="Delete"
        nameBtnCancel="Cancel"
        onClickAccept={() => handleDeleteUser()}
      />
    </>
  );
};

export default AdminInfoSingleUserComponent;
