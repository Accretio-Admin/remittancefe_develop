import React from "react";
import DashboardMainComponent from "../../../../components/dashboard/DashboardMain";
import CApiGroupsManagementComponent from "../../../../components/configs/api-groups-management/CApiGroupsManagement";

const ConfigApiGroupsManagement = () => {
  return (
    <DashboardMainComponent>
      <CApiGroupsManagementComponent />
    </DashboardMainComponent>
  );
};

export default ConfigApiGroupsManagement;
