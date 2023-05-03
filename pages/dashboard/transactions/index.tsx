import { useRouter } from "next/router";
import React, { useEffect } from "react";
import UserAccessGuardComponentComponent from "../../../components/customs/UserAccessGuardComponent";
import DashboardMainComponent from "../../../components/dashboard/DashboardMain";
import { LocalStorageAuthService } from "../../../services/LocalStorageService";

const TransactionsPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace("/dashboard/users");
  }, []);

  return (
    <DashboardMainComponent>
      <UserAccessGuardComponentComponent
        showOrHidden={
          LocalStorageAuthService().getUserAccessLevels().transactions.main
        }
      >
        <></>
      </UserAccessGuardComponentComponent>
    </DashboardMainComponent>
  );
};

export default TransactionsPage;
