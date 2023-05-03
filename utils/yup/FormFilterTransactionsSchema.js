import { Yup } from ".";

export const FormFilterTransactionsSchema =
  Yup.object().shape({
    email: Yup.string(),
    ip: Yup.string(),
    status: Yup.string(),
    transactionCode: Yup.string(),
    type: Yup.string(),
  });
