import React from "react";
import { IWrapperInput } from "../../interfaces/inputs/IInput.interface";

const WrapperInputComponent = ({
  children,
  wrapperOne = "my-2",
}: IWrapperInput) => {
  return <div className={wrapperOne}>{children}</div>;
};

export default WrapperInputComponent;
