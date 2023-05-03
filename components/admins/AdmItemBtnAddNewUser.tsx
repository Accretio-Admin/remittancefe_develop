import React from "react";
import { fontSize } from "../../utils/font_size";
import LinksCustom from "../customs/LinksCustom";
import { AddIcon } from "../mui";

const AdmItemBtnAddNewUserComponent = () => {
  return (
    <LinksCustom
      href="/dashboard/create/add-admin"
      nameLink={
        <div className="bg-nsTurbo1 cursor-pointer rounded-nsBase w-[176px] h-[48px] flex items-center justify-center">
          <AddIcon sx={{ fontSize: fontSize["3xl"] }} />
          <p className="m-0 text-nsBlack1 font-medium text-sm">Add New User</p>
        </div>
      }
    />
  );
};

export default AdmItemBtnAddNewUserComponent;
