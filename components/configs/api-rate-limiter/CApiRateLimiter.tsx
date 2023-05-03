import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
  IConfigAPIRateLimiter,
  IConfigs,
} from "../../../interfaces/configs/IConfigTransaction.interface";
import { setShowFullPage } from "../../../redux/features/loading_full_page/LoadingFullPage-Slice";
import { useAppDispatch } from "../../../redux/hook";
import { ApiService } from "../../../services/ApiService";
import { FormConfigApiRateLimiterSchema } from "../../../utils/yup";
import ButtonCustomOne from "../../buttons/ButtonCustomOne";
import ItemBoxTitleAnDescriptionAndLabelCustomComponent from "../../customs/ItemBoxTitleAnDescriptionAndLabelCustom";
import InputCustomOne from "../../inputs/InputCustomOne";
import WrapperInputComponent from "../../inputs/WrapperInput";
import { loggerService } from "../../../services/LoggerService";
const CApiRateLimiter = () => {
  const dispatch = useAppDispatch();
  const [idConfig, setIdConfig] = useState<string>("");
  const [initialState, setInitialState] = useState<IConfigAPIRateLimiter>({
    totalNumber: 0,
    callPerSecond: 0,
    dailyLimit: 0,
  });
  useEffect(() => {
    (async () => {
      dispatch(setShowFullPage({ active: true }));
      try {
        let iConfigApiRateLimiter = (
          await (
            await ApiService().configs().getAllConfigs()
          ).data
        )[0] as IConfigs;
        setInitialState((prv) => {
          return {
            ...prv,
            ...iConfigApiRateLimiter.apiRateLimiter,
          };
        });
        setIdConfig(iConfigApiRateLimiter.id as string);
      } catch (error) {
        return error;
      }
      dispatch(setShowFullPage({ active: false }));
    })();
  }, []);
  return (
    <Formik
      enableReinitialize={true}
      validateOnMount
      validationSchema={FormConfigApiRateLimiterSchema}
      initialValues={initialState}
      onSubmit={async (data, { setSubmitting }) => {
        await loggerService({
          after: data,
          before: initialState,
          nameModuleSelect: "cApiRateLimiter",
        });
        let dataConfigApiRateLimiter = {
          apiRateLimiter: {
            ...data,
          },
        };
        dispatch(setShowFullPage({ active: true }));
        try {
          await (
            await ApiService()
              .configs()
              .updateConfigs(idConfig, dataConfigApiRateLimiter)
          ).data;
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
        isValid,
        dirty,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit} className="flex flex-col w-full relative">
          <ItemBoxTitleAnDescriptionAndLabelCustomComponent
            nameLabel="Rate Limitation"
            title="Rate Limiter"
            description=""
          >
            <>
              <p className="mx-5">A total number of calls</p>
              <WrapperInputComponent wrapperOne="my-3 w-full">
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
                  type="number"
                  name="totalNumber"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.totalNumber}
                  placeholder="Please enter your total number"
                  error={touched.totalNumber && Boolean(errors.totalNumber)}
                  helperText={touched.totalNumber && errors.totalNumber}
                />
              </WrapperInputComponent>
              <p className="mx-5">Api Call Per Second</p>
              <WrapperInputComponent wrapperOne="my-3 w-full">
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
                  type="number"
                  name="callPerSecond"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.callPerSecond}
                  placeholder="Please enter your callPerSecond"
                  error={touched.callPerSecond && Boolean(errors.callPerSecond)}
                  helperText={touched.callPerSecond && errors.callPerSecond}
                />
              </WrapperInputComponent>
              <p className="mx-5">Daily Limit</p>
              <WrapperInputComponent wrapperOne="my-3 w-full">
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
                  type="number"
                  name="dailyLimit"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.dailyLimit}
                  placeholder="Please enter your daily Limit"
                  error={touched.dailyLimit && Boolean(errors.dailyLimit)}
                  helperText={touched.dailyLimit && errors.dailyLimit}
                />
              </WrapperInputComponent>
            </>
          </ItemBoxTitleAnDescriptionAndLabelCustomComponent>
          <div className="my-10">
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
  );
};

export default CApiRateLimiter;
