import React from "react";
import CApiRateLimiter from "../../../../components/configs/api-rate-limiter/CApiRateLimiter";
import DashboardMainComponent from "../../../../components/dashboard/DashboardMain";

const ConfigApiRateLimiterPage = () => {
  return (
    <DashboardMainComponent>
      <CApiRateLimiter />
    </DashboardMainComponent>
  );
};

export default ConfigApiRateLimiterPage;
