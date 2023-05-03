import React from "react";
import NextBreadcrumbsComponent from "../breadcrumb/NextBreadcrumbs";
import SharedSelectProjectComponent from "./SharedSelectProject";

const NavBreadCrumbAndSelectProjectComponent = () => {
  return (
    <div className="relative m-5">
      <div className="h-[45px] flex items-center">
        <NextBreadcrumbsComponent />
      </div>
      <div className="absolute right-0 top-0 z-10">
        <SharedSelectProjectComponent />
      </div>
    </div>
  );
};

export default NavBreadCrumbAndSelectProjectComponent;
