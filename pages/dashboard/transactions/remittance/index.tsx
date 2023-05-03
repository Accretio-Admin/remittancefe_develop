import React from "react";
import DashboardMainComponent from "../../../../components/dashboard/DashboardMain";
import TransactionRemittanceHome from "../../../../components/transactions/transaction_remittance/TransactionRemittanceHome";

const TransactionRemittance = () => {
  return (
    <DashboardMainComponent>
      <TransactionRemittanceHome />
    </DashboardMainComponent>
  );
};

export default TransactionRemittance;
