import { Yup } from ".";

export const FormConfigApiRateLimiterSchema = Yup.object().shape({
    totalNumber:Yup.number().required("Total Number is required"),
    callPerSecond:Yup.number().required("Call Per Second is required"),
    dailyLimit:Yup.number().required("Daily Limit is required"),
});