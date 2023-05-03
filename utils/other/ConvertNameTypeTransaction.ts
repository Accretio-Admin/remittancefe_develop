import {
  ETypeOfRealTransaction,
  ETypeOfTransaction,
} from "../../interfaces/transactions/ITransactions.interface";

export const ConvertNameTypeTransaction = (
  nameType: keyof typeof ETypeOfTransaction
) => {
  switch (nameType) {
    case "op":
      return ETypeOfRealTransaction.Remittance;
    case "pa":
      return ETypeOfRealTransaction["Cash pickup"];
    default:
      break;
  }
};
