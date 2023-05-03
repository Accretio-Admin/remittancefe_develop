import React from "react";
import ButtonCustomOne from "../../buttons/ButtonCustomOne";
import { Formik } from "formik";
import WrapperInputComponent from "../../inputs/WrapperInput";
import InputCustomOne from "../../inputs/InputCustomOne";
import { FormConfigApiGroupsManagementCreateNameSchema } from "../../../utils/yup";
import { IFormApiGroupManagementCreateName } from "../../../interfaces/formik/IFormik.interface";
import { useAppDispatch } from "../../../redux/hook";
import { setShowFullPage } from "../../../redux/features/loading_full_page/LoadingFullPage-Slice";
import { ApiService } from "../../../services/ApiService";

const CreateApiGroupBoxComponentCustom = ({
  callbackSuccessCreateName,
}: {
  callbackSuccessCreateName: () => void;
}) => {
  const initialState: IFormApiGroupManagementCreateName = {
    name: "",
  };
  const dispatch = useAppDispatch();
  return (
    <div className="flex items-center justify-center pb-16">
      <div className="relative">
        <div className="bg-nsWhite1 p-16 w-[500px] rounded-ns5xl z-10 relative">
          <h1 className="m-0 py-1 text-nsBigStone1">Try it now!</h1>
          <h2 className="m-0 py-1 text-nsBigStone1">
            Create your own API Group.
          </h2>
          <div className="my-4">
            <Formik
              enableReinitialize={true}
              validateOnMount
              initialValues={initialState}
              validationSchema={FormConfigApiGroupsManagementCreateNameSchema}
              onSubmit={async ({ name }, { setSubmitting }) => {
                try {
                  dispatch(setShowFullPage({ active: true }));
                  await (
                    await ApiService()
                      .apiGroupsManagement()
                      .createApiGroupManagement({ name, endpoints: [] })
                  ).data;
                } catch (error) {
                  return error;
                }
                callbackSuccessCreateName();
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
                  <p className="m-0 w-full font-semibold">Group name</p>

                  <WrapperInputComponent wrapperOne="w-full">
                    <InputCustomOne
                      colorInputCustom="nsBigStone1"
                      borderRadiusCustom="md"
                      bgColorCustom="nsWhite1"
                      fontSizeCustom="sm"
                      fieldsetBorderColorCustom="nsPigeonPost1"
                      placeholderColorCustom="nsPigeonPost1"
                      focusedPlaceholderColorCustom="nsPigeonPost1"
                      muiFocusedShadowCustom="nsOne"
                      fullWidth
                      type="text"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      placeholder="Enter your API group name here"
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </WrapperInputComponent>
                  <div className="my-8 w-full">
                    <ButtonCustomOne
                      sizeBorderRadius="md"
                      sizeHeight="md"
                      bgColorCustom="nsSunglow1"
                      dropShadowCustom="nsOne"
                      colorTextCustom="nsBlack1"
                      variant="contained"
                      type="submit"
                      className="w-full"
                      size="large"
                      disabled={!(isValid && dirty) || isSubmitting}
                    >
                      Create Now
                    </ButtonCustomOne>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
        <div className="bg-nsLightningYellow1/40 w-[500px] h-[400px] absolute  rounded-ns5xl -bottom-[25px] -right-[25px] " />
      </div>
    </div>
  );
};

export default CreateApiGroupBoxComponentCustom;
