import React, { useState } from "react";
import IconButtonCustomOne from "../buttons/IconButtonCustomOne";
import { FullscreenIcon } from "../mui";
import LogsModalInfoMoreCustomComponentCustom from "./LogsModalInfoMoreCustom";

const LogsButtonInfoMoreComponentCustom = ({ infoMore }: { infoMore: any }) => {
  const [showOrOffModal, setShowOrOffModal] = useState<boolean>(false);
  return (
    <>
      <IconButtonCustomOne
        onClick={()=> setShowOrOffModal(true)}
        aria-label="more info transaction"
      >
        <FullscreenIcon />
      </IconButtonCustomOne>
      <LogsModalInfoMoreCustomComponentCustom
        onClickCancel={setShowOrOffModal}
        handleOpenModalValue={showOrOffModal}
        dataInfoMore={infoMore}
      />
    </>
  );
};

export default LogsButtonInfoMoreComponentCustom;
