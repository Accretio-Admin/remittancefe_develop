import React from "react";
import { IButtonVOneProps } from "../../interfaces/buttons/IButtons.interface";
import { Button } from "../mui";

const ButtonVOne = ({
  type,
  disabled,
  onClick,
  children,
  className,
}: IButtonVOneProps) => {
  return (
    <Button
      variant="contained"
      className={`cursor-pointer ${className ? className : ""}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
      size="small"
    >
      {children}
    </Button>
  );
};

export { ButtonVOne };
