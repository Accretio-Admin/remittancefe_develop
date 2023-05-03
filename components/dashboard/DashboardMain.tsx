import React from "react";
import { IChildrenProps } from "../../interfaces/other/IOther.interface";
import LogoAndNameComponent from "../others/LogoAndName";
import SharedMainComponent from "../shared/SharedMain";
import DashboardContentComponent from "./DashboardContent";
import DashboardItemLogoutComponent from "./DashboardItemLogout";
import DashboardItemNameRoleComponent from "./DashboardItemNameRole";
import DashboardItemStaticComponent from "./DashboardItemStatic";
import DrawerMainComponent from "./DrawerMain";
import { UserIdleService } from "../../services/UserIdleService";

const DashboardMainComponent = ({ children }: IChildrenProps) => {
  UserIdleService()
  return (
    <div className="flex w-full">
      <div className="w-[20%]">
        <div className="fixed w-[inherit] left-0 h-screen bg-nsSin1 flex flex-col justify-between py-5">
          <div>
            <LogoAndNameComponent href="/dashboard" nameTagP="REMITTANCE" />
            <div className="my-3">
              <DashboardItemStaticComponent />
            </div>
            <DrawerMainComponent />
          </div>
          <div className="mx-5 flex flex-col justify-center">
            <DashboardItemNameRoleComponent />
            <div className="bg-nsSwissCoffee1 h-[1px] my-5" />
            <DashboardItemLogoutComponent />
          </div>
        </div>
      </div>
      <div className="w-[80%] h-screen">
        <SharedMainComponent />
        <DashboardContentComponent>{children}</DashboardContentComponent>
      </div>
    </div>
  );
};

export default DashboardMainComponent;
