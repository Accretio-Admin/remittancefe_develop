import React from "react";
import AdmTableDataGridAssignIpUserComponent from "../../../../components/admins/assign_ip_user/AdmTableDataGridAssignIpUser";
import AdminInfoSingleUserComponent from "../../../../components/admins/AdminInfoSingleUser";
import UserAccessGuardComponentComponent from "../../../../components/customs/UserAccessGuardComponent";
import DashboardMainComponent from "../../../../components/dashboard/DashboardMain";
import { LocalStorageAuthService } from "../../../../services/LocalStorageService";
import AdminManageApiKeyMainComponent from "../../../../components/admins/manage_api_key/AdminManageApiKeyMain";

const AdminSingleInfoUserPage = () => {
  return (
    <DashboardMainComponent>
      <UserAccessGuardComponentComponent
        showOrHidden={
          LocalStorageAuthService().getUserAccessLevels().users.listing.edit
            .main
        }
        nestedComponentBoolean={true}
      >
        <>
          <AdminInfoSingleUserComponent />
          <AdminManageApiKeyMainComponent />
          <UserAccessGuardComponentComponent
            showOrHidden={
              LocalStorageAuthService().getUserAccessLevels().users.listing.edit
                .ipAssignment
            }
          >
            <AdmTableDataGridAssignIpUserComponent />
          </UserAccessGuardComponentComponent>
        </>
      </UserAccessGuardComponentComponent>
    </DashboardMainComponent>
  );
};

export default AdminSingleInfoUserPage;
