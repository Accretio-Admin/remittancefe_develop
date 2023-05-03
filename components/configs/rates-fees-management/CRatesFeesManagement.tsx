import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
  IConfigRatesFeesManagement,
  IConfigs,
} from "../../../interfaces/configs/IConfigTransaction.interface";
import { setShowFullPage } from "../../../redux/features/loading_full_page/LoadingFullPage-Slice";
import { useAppDispatch } from "../../../redux/hook";
import { ApiService } from "../../../services/ApiService";
import { Colors } from "../../../utils/colors";
import { FormConfigRatesFeeManagementSchema } from "../../../utils/yup";
import ButtonCustomOne from "../../buttons/ButtonCustomOne";
import IconButtonCustomOne from "../../buttons/IconButtonCustomOne";
import ItemBoxTitleAnDescriptionAndLabelCustomComponent from "../../customs/ItemBoxTitleAnDescriptionAndLabelCustom";
import InputCustomOne from "../../inputs/InputCustomOne";
import WrapperInputComponent from "../../inputs/WrapperInput";
import {
  PercentIcon,
  InputAdornment,
  ToggleOffIcon,
  ToggleOnIcon,
} from "../../mui";
import { loggerService } from "../../../services/LoggerService";

const CRatesFeesManagement = () => {
  const dispatch = useAppDispatch()
  const [idConfig, setIdConfig] = useState<string>("");
  const [initialState, setInitialState] = useState<IConfigRatesFeesManagement>({
    percentage: {
      value: 0,
      active: true,
    },
    markup: {
      value: 0,
      active: false,
    },
  });

  useEffect(() => {
    (async () => {
      dispatch(setShowFullPage({ active: true }));
      try {
        let iConfigRatesFeeManagement = (
          await (
            await ApiService().configs().getAllConfigs()
          ).data
        )[0] as IConfigs;
        setInitialState((prv) => {
          return {
            ...prv,
            ...iConfigRatesFeeManagement.ratesFeesManagement,
          };
        });
        setIdConfig(iConfigRatesFeeManagement.id as string);
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
      initialValues={initialState}
      validationSchema={FormConfigRatesFeeManagementSchema}
      onSubmit={async (data, { setSubmitting }) => {
        await loggerService({
          after: data,
          before: initialState,
          nameModuleSelect: "cRatesFeesManagement",
        });
        let dataConfigRatesFeeManagement = {
          ratesFeesManagement: {
            ...data,
          },
        };
        dispatch(setShowFullPage({ active: true }));
        try {
          await (
            await ApiService()
              .configs()
              .updateConfigs(idConfig, dataConfigRatesFeeManagement)
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
        setFieldValue,
        isSubmitting,
        isValid,
        dirty,
      }) => (
        <form onSubmit={handleSubmit} className="flex flex-col w-full ">
          <ItemBoxTitleAnDescriptionAndLabelCustomComponent
            nameLabel="Rates Fees Management"
            title="Rates And Fees Management"
            description=""
          >
            <>
              <p className="mx-5">Percentage</p>
              <WrapperInputComponent wrapperOne="my-3 w-full">
                <InputCustomOne
                  colorInputCustom="nsBlack1"
                  borderRadiusCustom="md"
                  bgColorCustom="nsWhite1"
                  fontSizeCustom="sm"
                  disabled={!values.percentage.active}
                  fieldsetBorderColorCustom="nsGray1"
                  placeholderColorCustom="nsBlack1"
                  focusedPlaceholderColorCustom="nsBlack1"
                  muiFocusedShadowCustom="nsOne"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <div>
                          <IconButtonCustomOne edge="end">
                            <PercentIcon />
                          </IconButtonCustomOne>
                        </div>
                        <div>
                          <IconButtonCustomOne
                            onClick={() => {
                              if (values.percentage.active) {
                                setFieldValue("percentage.active", false);
                                setFieldValue("markup.active", true);
                              } else {
                                setFieldValue("percentage.active", true);
                                setFieldValue("markup.active", false);
                              }
                            }}
                            edge="end"
                          >
                            {values.percentage.active ? (
                              <ToggleOnIcon
                                sx={{ color: Colors.nsFunGreen1 }}
                              />
                            ) : (
                              <ToggleOffIcon sx={{ color: Colors.nsRed1 }} />
                            )}
                          </IconButtonCustomOne>
                        </div>
                      </InputAdornment>
                    ),
                  }}
                  type="number"
                  name="percentage.value"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.percentage.value}
                  placeholder="Please enter your percentage"
                  error={
                    touched.percentage?.value &&
                    Boolean(errors.percentage?.value)
                  }
                  helperText={
                    touched.percentage?.value && errors.percentage?.value
                  }
                />
              </WrapperInputComponent>
              <p className="mx-5">MarkUp</p>
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
                  disabled={!values.markup.active}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <div>
                          <IconButtonCustomOne
                            onClick={() => {
                              if (values.markup.active) {
                                setFieldValue("percentage.active", true);
                                setFieldValue("markup.active", false);
                              } else {
                                setFieldValue("percentage.active", false);
                                setFieldValue("markup.active", true);
                              }
                            }}
                            edge="end"
                          >
                            {values.markup.active ? (
                              <ToggleOnIcon
                                sx={{ color: Colors.nsFunGreen1 }}
                              />
                            ) : (
                              <ToggleOffIcon sx={{ color: Colors.nsRed1 }} />
                            )}
                          </IconButtonCustomOne>
                        </div>
                      </InputAdornment>
                    ),
                  }}
                  type="number"
                  name="markup.value"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.markup.value}
                  placeholder="Please enter your markup"
                  error={touched.markup?.value && Boolean(errors.markup?.value)}
                  helperText={touched.markup?.value && errors.markup?.value}
                />
              </WrapperInputComponent>
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
            </>
          </ItemBoxTitleAnDescriptionAndLabelCustomComponent>
        </form>
      )}
    </Formik>
  );
};

export default CRatesFeesManagement;
