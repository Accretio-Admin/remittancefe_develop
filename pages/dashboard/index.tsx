import React, { useEffect } from "react";
import DashboardMainComponent from "../../components/dashboard/DashboardMain";
import { ApiService } from "../../services/ApiService";
const DashboardMain = () => {
  useEffect(() => {
   (async()=>{
    await(
      await ApiService()
        .users()
        .getAllUsers(1, 5, "user.email:asc,transactionCode:desc,type:asc,status:asc,receiver:asc,comission:asc", "")
    ).data;
   })()
  }, []);

  return (
    <>
      <DashboardMainComponent>
        <div>Welcome</div>
      </DashboardMainComponent>
    </>
  );
};

export default DashboardMain;
