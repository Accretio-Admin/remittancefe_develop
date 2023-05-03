import React from "react";
import DashboardMainComponent from "../../../components/dashboard/DashboardMain";
import LogTableDataGridList from "../../../components/logs/LogTableDataGridList";

const LogsPage = () => {
  return (
    <DashboardMainComponent>
        <LogTableDataGridList />
    </DashboardMainComponent>
  );
};

export default LogsPage;
