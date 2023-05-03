import { Yup } from ".";

export const FormConfigTransactionSchema = Yup.object().shape({
  frequency: Yup.object().shape({
    cutoffTime: Yup.object().shape({
      cutoffEndTime: Yup.date(),
      cutoffStartTime: Yup.date(),
    }),
    duplication: Yup.bool(),
  }),
  transactionAmount: Yup.object().shape({
    transactionAmountLimit: Yup.object().shape({
      petTransactionAmount: Yup.number(),
      transactionTotalAmount: Yup.number(),
    }),
  }),
});
