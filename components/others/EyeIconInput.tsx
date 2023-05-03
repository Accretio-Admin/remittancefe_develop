import React from "react";
import { IEyeIconInputComponent } from "../../interfaces/other/IOther.interface";
import { VisibilityIcon, VisibilityOffIcon } from "../mui";

const EyeIconInputComponent = ({
  showOrHidden = false,
  onClick
}: IEyeIconInputComponent) => {
  return (
    <div className="cursor-pointer" onClick={onClick}>
      {showOrHidden ? (
        <div>
          <VisibilityOffIcon />
        </div>
      ) : (
        <div>
          <VisibilityIcon />
        </div>
      )}
    </div>
  );
};

export default EyeIconInputComponent;
