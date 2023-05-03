import React, { useState } from "react";
import { LogoutUserService } from "../../services/LogoutUserService";
import IconButtonCustomOne from "../buttons/IconButtonCustomOne";
import ModalCustomComponent from "../customs/ModalCustom";
import { LogoutOutlinedIcon } from "../mui";

const DashboardItemLogoutComponent = () => {
  const [showOrOffModal, setShowOrOffModal] = useState<boolean>(false);
  return (
    <>
      <div
        onClick={() => setShowOrOffModal(true)}
        className="flex items-center cursor-pointer"
      >
        <div className="flex items-center justify-center bg-nsBlack1 rounded-nsFull w-[50px] h-[50px]">
          <IconButtonCustomOne
            colorIconCustom="nsWhite1"
            aria-label="Back to page "
          >
            <LogoutOutlinedIcon />
          </IconButtonCustomOne>
        </div>

        <p className="m-0 pl-3">Logout</p>
      </div>
      <ModalCustomComponent
        onClickCancel={setShowOrOffModal}
        handleOpenModalValue={showOrOffModal}
        titleModal="Signout!"
        descriptionModal="Are you sure you want to signout?"
        nameBtnAccept="Confirm"
        nameBtnCancel="Cancel"
        onClickAccept={async () => await LogoutUserService()}
      />
    </>
  );
};

export default DashboardItemLogoutComponent;
