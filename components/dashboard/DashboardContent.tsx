import { useRouter } from "next/router";
import React from "react";
import DashboardHeadContentComponent from "./DashboardHeadContent";

const DashboardContentComponent = ({ children }: any) => {
  const router = useRouter();
  const removeSpecialClass = () => {
    return ["/dashboard/users", "/dashboard/transactions"].includes(
      router.pathname
    )
      ? ""
      : "px-5";
  };
  return (
    <div className={`bg-nsVistaWhite1 ${removeSpecialClass()} relative min-h-[calc(100%-85px)]`}>
      <DashboardHeadContentComponent />
      <div className="w-full  bg-nsEbb1 h-[1px] absolute left-0 z-10 line-nav-section" />
      {children}
    </div>
  );
};

export default DashboardContentComponent;
