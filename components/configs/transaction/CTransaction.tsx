import { Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import ButtonCustomOne from "../../buttons/ButtonCustomOne";
import IconButtonCustomOne from "../../buttons/IconButtonCustomOne";
import ItemBoxCustomComponent from "../../customs/ItemBoxCustom";
import ItemBoxTitleAnDescriptionAndLabelCustomComponent from "../../customs/ItemBoxTitleAnDescriptionAndLabelCustom";
import InputCustomOne from "../../inputs/InputCustomOne";
import WrapperInputComponent from "../../inputs/WrapperInput";
import { EditIcon, InputAdornment, TextField, TimePicker } from "../../mui";
import { ApiService } from "../../../services/ApiService";
import {
  IConfigs,
  IConfigTransaction,
} from "../../../interfaces/configs/IConfigTransaction.interface";
import { setShowFullPage } from "../../../redux/features/loading_full_page/LoadingFullPage-Slice";
import { useAppDispatch } from "../../../redux/hook";
import { FormConfigTransactionSchema } from "../../../utils/yup";
import { loggerService } from "../../../services/LoggerService";
const CTransactionComponent = () => {
  let duplicationArray = [
    {
      name: "Duplication will be allowed",
      description: "Name and Amount basis duplication checking",
      value: true,
      secret: "allowed",
    },
    {
      name: "Duplication will be not allowed",
      description: "No duplication checking. Excluding bank rejection.",
      value: false,
      secret: "notAllowed",
    },
  ];
  const dispatch = useAppDispatch();
  const [idConfig, setIdConfig] = useState<string>("");
  const [initialState, setInitialState] = useState<IConfigTransaction>({
    frequency: {
      cutoffTime: {
        cutoffEndTime: "2023-08-18T13:11:54.000Z",
        cutoffStartTime: "2014-08-18T13:11:54.000Z",
      },
      duplication: false,
    },
    transactionAmount: {
      transactionAmountLimit: {
        perTransactionAmount: 0,
        transactionTotalAmount: 0,
        perDayTransactionAmount: 0,
      },
    },
  });
  useEffect(() => {
    (async () => {
      dispatch(setShowFullPage({ active: true }));
      try {
        let iConfigTransaction = (
          await (
            await ApiService().configs().getAllConfigs()
          ).data
        )[0] as IConfigs;
        setInitialState((prv) => {
          return {
            ...prv,
            ...iConfigTransaction.transaction,
          };
        });
        setIdConfig(iConfigTransaction.id as string);
      } catch (error) {
        return error;
      }
      dispatch(setShowFullPage({ active: false }));
    })();
  }, []);

  const [disabledTransactionTotalAmount, setDisabledTransactionTotalAmount] =
    useState<boolean>(true);
  const [disabledPerTransactionAmount, setDisabledPerTransactionAmount] =
    useState<boolean>(true);
  const [disabledPerDayTransactionAmount, setDisabledPerDayTransactionAmount] =
    useState<boolean>(true);
  return (
    <>
      <Formik
        enableReinitialize={true}
        validateOnMount
        initialValues={initialState}
        validationSchema={FormConfigTransactionSchema}
        onSubmit={async (data, { setSubmitting }) => {
          await loggerService({
            after: data,
            before: initialState,
            nameModuleSelect: "cTransaction",
          });
          let dataConfigTransaction = {
            transaction: {
              ...data,
            },
          };
          dispatch(setShowFullPage({ active: true }));
          try {
            await (
              await ApiService()
                .configs()
                .updateConfigs(idConfig, dataConfigTransaction)
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
          setFieldValue,
        }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full relative"
          >
            <ItemBoxTitleAnDescriptionAndLabelCustomComponent
              nameLabel="Cutoff & Duplication"
              title="Frequency & Duplication"
              description=""
            >
              <>
                <ItemBoxCustomComponent bgColorParentFirst="nsAlabaster1">
                  <div>
                    <p className="m-0 py-2">
                      Duplication to note be allowed or not.
                    </p>
                    <div className="flex">
                      <Field
                        name="frequency.duplication"
                        render={({ field }: { field: any }) => (
                          <>
                            {duplicationArray.map((item, index) => {
                              return (
                                <div key={index} className="radio-item">
                                  <input
                                    {...field}
                                    id={item.secret}
                                    value={item.secret}
                                    checked={field.value === item.value}
                                    name="type"
                                    type="radio"
                                    className="hidden"
                                    onChange={(e) => {
                                      setFieldValue(
                                        "frequency.duplication",
                                        item.value
                                      );
                                    }}
                                  />
                                  <label htmlFor={item.secret}>
                                    <div className="h-[100px] cursor-pointer p-3 flex justify-around flex-col mr-10 bg-nsLightningYellow1 rounded-nsBase border border-solid border-nsSilver2">
                                      <div className="flex items-center">
                                        <div className="border border-solid border-black rounded-nsFull w-[25px] h-[25px] bg-nsWhite1  flex items-center">
                                          {field.value === item.value && (
                                            <div className="bg-nsBlack1 w-[13px] h-[13px] rounded-nsFull m-auto" />
                                          )}
                                        </div>
                                        <p className="m-0 pl-3 capitalize">
                                          Duplication{" "}
                                          {item.secret == "notAllowed"
                                            ? "Not Allowed"
                                            : item.secret}
                                        </p>
                                      </div>
                                      <p className="m-0">{item.description}</p>
                                    </div>
                                  </label>
                                </div>
                              );
                            })}
                          </>
                        )}
                      />
                    </div>
                  </div>
                </ItemBoxCustomComponent>
                <div className="p-4 flex">
                  <p>Cutoff</p>
                  <div className="mx-5 flex">
                    <TimePicker
                      label="Cutoff Start Time"
                      value={values.frequency.cutoffTime.cutoffStartTime}
                      onChange={(data) =>
                        setFieldValue(
                          "frequency.cutoffTime.cutoffStartTime",
                          data
                        )
                      }
                      renderInput={(params) => (
                        <TextField
                          name="cutoffStartTime"
                          id="cutoffStartTime"
                          {...params}
                        />
                      )}
                    />
                    <div className="mx-5" />
                    <TimePicker
                      label="Cutoff End Time"
                      value={values.frequency.cutoffTime.cutoffEndTime}
                      onChange={(data) =>
                        setFieldValue(
                          "frequency.cutoffTime.cutoffEndTime",
                          data
                        )
                      }
                      renderInput={(params) => (
                        <TextField
                          name="cutoffEndTime"
                          id="cutoffEndTime"
                          {...params}
                        />
                      )}
                    />
                  </div>
                </div>
              </>
            </ItemBoxTitleAnDescriptionAndLabelCustomComponent>
            <ItemBoxTitleAnDescriptionAndLabelCustomComponent
              nameLabel="Limits by Amount"
              title="Transaction Amount Limitation"
              description=""
            >
              <>
                <p className="mx-5">Per transaction amount</p>
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
                    disabled={disabledPerTransactionAmount}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <div className="mr-5">
                            <IconButtonCustomOne
                              onClick={() =>
                                setDisabledPerTransactionAmount(
                                  !disabledPerTransactionAmount
                                )
                              }
                              edge="end"
                            >
                              <EditIcon />
                            </IconButtonCustomOne>
                          </div>
                        </InputAdornment>
                      ),
                    }}
                    fullWidth
                    type="number"
                    name="perTransactionAmount"
                    onChange={(e) => {
                      setFieldValue(
                        "transactionAmount.transactionAmountLimit.perTransactionAmount",
                        e.target.value
                      );
                    }}
                    onBlur={handleBlur}
                    value={
                      values.transactionAmount.transactionAmountLimit
                        .perTransactionAmount
                    }
                    placeholder="Pet transaction amount"
                    error={
                      touched.transactionAmount?.transactionAmountLimit
                        ?.perTransactionAmount &&
                      Boolean(
                        errors.transactionAmount?.transactionAmountLimit
                          ?.perTransactionAmount
                      )
                    }
                    helperText={
                      touched.transactionAmount?.transactionAmountLimit
                        ?.perTransactionAmount &&
                      errors.transactionAmount?.transactionAmountLimit
                        ?.perTransactionAmount
                    }
                  />
                </WrapperInputComponent>
                <p className="mx-5">Total accumulated amount</p>
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
                    disabled={disabledTransactionTotalAmount}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <div className="mr-5">
                            <IconButtonCustomOne
                              onClick={() =>
                                setDisabledTransactionTotalAmount(
                                  !disabledTransactionTotalAmount
                                )
                              }
                              edge="end"
                            >
                              <EditIcon />
                            </IconButtonCustomOne>
                          </div>
                        </InputAdornment>
                      ),
                    }}
                    name="transactionTotalAmount"
                    onChange={(e) => {
                      setFieldValue(
                        "transactionAmount.transactionAmountLimit.transactionTotalAmount",
                        e.target.value
                      );
                    }}
                    onBlur={handleBlur}
                    value={
                      values.transactionAmount.transactionAmountLimit
                        .transactionTotalAmount
                    }
                    placeholder="Transaction total amount"
                    error={
                      touched.transactionAmount?.transactionAmountLimit
                        ?.transactionTotalAmount &&
                      Boolean(
                        errors.transactionAmount?.transactionAmountLimit
                          ?.transactionTotalAmount
                      )
                    }
                    helperText={
                      touched.transactionAmount?.transactionAmountLimit
                        ?.transactionTotalAmount &&
                      errors.transactionAmount?.transactionAmountLimit
                        ?.transactionTotalAmount
                    }
                  />
                </WrapperInputComponent>
                <p className="mx-5">Per Day Transaction Amount Total</p>
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
                    disabled={disabledPerDayTransactionAmount}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <div className="mr-5">
                            <IconButtonCustomOne
                              onClick={() =>
                                setDisabledPerDayTransactionAmount(
                                  !disabledPerDayTransactionAmount
                                )
                              }
                              edge="end"
                            >
                              <EditIcon />
                            </IconButtonCustomOne>
                          </div>
                        </InputAdornment>
                      ),
                    }}
                    name="perDayTransactionAmount"
                    onChange={(e) => {
                      setFieldValue(
                        "transactionAmount.transactionAmountLimit.perDayTransactionAmount",
                        e.target.value
                      );
                    }}
                    onBlur={handleBlur}
                    value={
                      values.transactionAmount.transactionAmountLimit
                        .perDayTransactionAmount
                    }
                    placeholder="Per Day Transaction Amount Total"
                    error={
                      touched.transactionAmount?.transactionAmountLimit
                        ?.perDayTransactionAmount &&
                      Boolean(
                        errors.transactionAmount?.transactionAmountLimit
                          ?.perDayTransactionAmount
                      )
                    }
                    helperText={
                      touched.transactionAmount?.transactionAmountLimit
                        ?.perDayTransactionAmount &&
                      errors.transactionAmount?.transactionAmountLimit
                        ?.perDayTransactionAmount
                    }
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
    </>
  );
};

export default CTransactionComponent;
