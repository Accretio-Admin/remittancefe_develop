import React from "react";
import AddAdminComponent from "../../../components/admins/AdminAdd";
import UserAccessGuardComponentComponent from "../../../components/customs/UserAccessGuardComponent";
import DashboardMainComponent from "../../../components/dashboard/DashboardMain";
import { LocalStorageAuthService } from "../../../services/LocalStorageService";

const AddAdminPage = () => {
  return (
    <DashboardMainComponent>
      <UserAccessGuardComponentComponent
        showOrHidden={
          LocalStorageAuthService().getUserAccessLevels().users.listing.add.main
        }
        nestedComponentBoolean={true}
      >
        <>
          <AddAdminComponent />
        </>
      </UserAccessGuardComponentComponent>
    </DashboardMainComponent>
  );
};

export default AddAdminPage;
