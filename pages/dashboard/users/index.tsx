import React from "react";
import AdminsList from "../../../components/admins/AdminsList";
import UserAccessGuardComponentComponent from "../../../components/customs/UserAccessGuardComponent";
import DashboardMainComponent from "../../../components/dashboard/DashboardMain";
import { LocalStorageAuthService } from "../../../services/LocalStorageService";
const AdminsPage = () => {
  return (
    <DashboardMainComponent>
      <UserAccessGuardComponentComponent
        showOrHidden={
          LocalStorageAuthService().getUserAccessLevels().users.main
        }
      >
        <AdminsList />
      </UserAccessGuardComponentComponent>
    </DashboardMainComponent>
  );
};

export default AdminsPage;
