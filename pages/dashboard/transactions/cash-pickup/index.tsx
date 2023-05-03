import React from "react";
import DashboardMainComponent from "../../../../components/dashboard/DashboardMain";
import TransactionCashPickUpHome from "../../../../components/transactions/transaction_cashpickup/TransactionCashPickUpHome";

const TransactionCashPickPage = () => {
  return (
    <DashboardMainComponent>
      <TransactionCashPickUpHome />
    </DashboardMainComponent>
  );
};

export default TransactionCashPickPage;
