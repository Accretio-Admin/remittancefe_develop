import React from "react";
import { helperThisUserIsMe } from "../../utils/helperMe";

const DashboardItemNameRoleComponent = () => {
  return (
    <p className="text-nsCloudBurst1 m-0 text-center text-lg font-semibold">
      {helperThisUserIsMe().showMyNameRole()}
    </p>
  );
};

export default DashboardItemNameRoleComponent;
