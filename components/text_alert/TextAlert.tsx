import React from "react";
import { ITextAlertProps } from "../../interfaces/text_alert/ITextAlert.interface";
import { Alert } from "../mui";

const TextAlert = ({ text, ...props }: ITextAlertProps) => {
  return (
    <div className="my-1">
      <Alert {...props}>{text}</Alert>
    </div>
  );
};

export default TextAlert;
