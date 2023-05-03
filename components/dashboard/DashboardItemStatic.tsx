import React from "react";
import { ArrowRightAltIcon, WidgetsIcon } from "../mui";

const DashboardItemStaticComponent = () => {
  return (
    <div className="flex items-center h-[40px] max-h-[40px] min-h-[40px] bg-nsLightningYellow1 rounded-r-nsFull w-[90%] px-5 justify-between">
      <div className="flex items-center">
        <WidgetsIcon />
        <p className="pl-3 my-0 font-semibold">Dashboard</p>
      </div>
      <div className="bg-nsWhite1 w-[35px] h-[35px] flex items-center justify-center rounded-nsFull">
        <ArrowRightAltIcon />
      </div>
    </div>
  );
};

export default DashboardItemStaticComponent;
