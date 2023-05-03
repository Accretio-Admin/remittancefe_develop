import React from "react";
import { ITextAlertProps } from "../../interfaces/text_alert/ITextAlert.interface";
import { Snackbar, SnackbarProps } from "../mui";
import TextAlert from "../text_alert/TextAlert";
const SnackbarText = ({
  defaultSnackbarProps,
  defaultAlertProps,
}: { defaultSnackbarProps: SnackbarProps } & {
  defaultAlertProps: ITextAlertProps;
}) => {
  return (
    <div>
      <Snackbar {...defaultSnackbarProps}>
        <div>
          <TextAlert {...defaultAlertProps} />
        </div>
      </Snackbar>
    </div>
  );
};

export default SnackbarText;
