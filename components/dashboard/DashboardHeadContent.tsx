import { useRouter } from "next/router";
import React from "react";
import { IDashboardHeadContent } from "../../interfaces/customs/ICustoms.interface";
import { ShowTitleDescriptionNav } from "../../utils/other/ShowTitleDescriptionNav";
import TitleDescriptionCustomComponent from "../customs/TitleDescriptionCustom";

const DashboardHeadContentComponent = () => {
  const router = useRouter();
  const dataText: IDashboardHeadContent = ShowTitleDescriptionNav(
    router.pathname
  );
  const removeSpecialClass = () => {
    return ["/dashboard/users", "/dashboard/transactions"].includes(
      router.pathname
    )
      ? "p-5"
      : "py-5";
  };
  return (
    <div className={`${removeSpecialClass()}`}>
      <TitleDescriptionCustomComponent
        description={dataText.description}
        title={dataText.title}
      />
    </div>
  );
};

export default DashboardHeadContentComponent;
