import { Formik } from "formik";
import React, { useEffect } from "react";
import { IAdminAssignIpUserComponent } from "../../../interfaces/admins/IAdmins.interface";
import { IFormAdminAssignIpUser } from "../../../interfaces/formik/IFormik.interface";
import {
  IAddAssignIpUser,
  IUpdateAssignIpUser,
} from "../../../interfaces/user/IUser.interface";
import { setResetValueEditAssignIpUser } from "../../../redux/features/admin_assign_ip_user/AdminAssignIpUser-Slice";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { ApiService } from "../../../services/ApiService";
import { FormAssignIpUserAddSchema } from "../../../utils/yup";
import ButtonCustomOne from "../../buttons/ButtonCustomOne";
import InputCustomOne from "../../inputs/InputCustomOne";
import WrapperInputComponent from "../../inputs/WrapperInput";

const AdminFormAddAssignIpUserComponent = ({
  callBackUpdateTable,
  idQuery,
}: IAdminAssignIpUserComponent) => {
  const dispatch = useAppDispatch();
  const { idColum, valueColum, modeEdit } = useAppSelector(
    (state) => state.admin_assign_ip_user
  );
  let initialState: IFormAdminAssignIpUser = {
    id: idColum,
    value: valueColum,
  };
  useEffect(() => {
    dispatch(setResetValueEditAssignIpUser());
  }, []);
  const handleAddAssignIpUser = async (data: IAddAssignIpUser) => {
    try {
      await (
        await ApiService().users().addAssignIpUser(data)
      ).data;
      callBackUpdateTable();
    } catch (error) {
      return error;
    }
  };
  const handleUpdateAssignIpUser = async (
    idIp: string,
    data: IUpdateAssignIpUser
  ) => {
    try {
      await (
        await ApiService().users().updateAssignIpUser(idIp, data)
      ).data;
      callBackUpdateTable();
    } catch (error) {
      return error;
    }
  };
  return (
    <Formik
      enableReinitialize={true}
      validateOnMount
      initialValues={initialState}
      validationSchema={FormAssignIpUserAddSchema}
      onSubmit={async ({ id, value }, { setSubmitting ,resetForm}) => {
        if (!modeEdit) {
          await handleAddAssignIpUser({
            userId: idQuery,
            limitType: "ip",
            value,
          });
        } else {
          await handleUpdateAssignIpUser(id, { limitType: "ip", value });
          dispatch(setResetValueEditAssignIpUser());
        }
        setSubmitting(false);
        resetForm();
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
        resetForm,
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
              name="value"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.value}
              error={touched.value && Boolean(errors.value)}
              helperText={touched.value && errors.value}
              placeholder="write users IP address here"
            />
          </WrapperInputComponent>

          <div className="mt-10 flex">
            <ButtonCustomOne
              disabledOpacityValue="0.5"
              boxShadowCustom="nsTwo"
              sizeBorderRadius="md"
              sizeHeight="md"
              bgColorCustom="nsGallery2"
              dropShadowCustom="nsOne"
              colorTextCustom="nsGray3"
              variant="contained"
              className="w-full"
              size="large"
              type="button"
              onClick={() => {
                dispatch(setResetValueEditAssignIpUser());
                resetForm();
              }}
              sx={{ fontWeight: "bold" }}
              disabled={isSubmitting}
            >
              Cancel
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
              disabled={!isValid || isSubmitting}
            >
              {!modeEdit ? "Assign" : "Update"}
            </ButtonCustomOne>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default AdminFormAddAssignIpUserComponent;
