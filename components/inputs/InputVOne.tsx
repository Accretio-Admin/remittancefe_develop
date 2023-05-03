import React from "react";
import { IInputVOneProps } from "../../interfaces/inputs/IInput.interface";
import { IStyleInputVOne } from "../../interfaces/styled/IStyled.interface";
import { Input, styled } from "../mui";
const StyledInput = styled(Input)<IStyleInputVOne>(({ theme, sWidth }) => ({
  ".MuiInputBase-input": {
    width: sWidth,
  },
  "&.MuiInputBase-root":{
    width:"100%"
  }
}));
const InputVOne = ({
  type,
  placeholder,
  value,
  onChange,
  name,
  onBlur,
  className,
  disabled,
  sWidth = "100%",
}: IInputVOneProps) => {
  return (
    <StyledInput
      sWidth={sWidth}
      className={`border-0 h-7 rounded-nsLg px-3 focus:outline-none my-2 ${className}`}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      name={name}
      disabled={disabled}
    />
  );
};

export { InputVOne };
