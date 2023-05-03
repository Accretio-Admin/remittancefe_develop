import { ETypeOfStatusTransaction } from "../../interfaces/transactions/ITransactions.interface";

export const TableDataGridItemColumStatusTransactionCustom = ({
  statusName,
}: {
  statusName: keyof typeof ETypeOfStatusTransaction;
}) => {
  const handleColorBox = () => {
    return {
      bg: statusName == "failed" ? "bg-nsFlamingo1/10" : "bg-nsShamrock1/10",
      text: statusName == "failed" ? "text-nsFlamingo1" : "text-nsShamrock1",
    };
  };
  return (
    <div className={`px-3 py-[2px] rounded-ns2xl  ${handleColorBox().bg}`}>
      <p className={`m-0 p-1 ${handleColorBox().text} font-medium`}>
        {statusName}
      </p>
    </div>
  );
};
