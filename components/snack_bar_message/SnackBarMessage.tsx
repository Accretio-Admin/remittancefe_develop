import React from "react";
import { setOffSnackBar } from "../../redux/features/snack_bar_msg/SnackBarMsg-Slice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import SnackbarText from "../snackbar/SnackbarText";

const SnackBarMessageComponent = () => {
  const { msg, openMsg, timeAutoHide, severity, anchorOriginPositions } =
    useAppSelector((state) => state.snack_bar_msg);
  const dispatch = useAppDispatch();
  return openMsg ? (
    <SnackbarText
      defaultAlertProps={{ severity, text: msg, variant: "filled" }}
      defaultSnackbarProps={{
        onClose: () => dispatch(setOffSnackBar()),
        open: openMsg,
        autoHideDuration: timeAutoHide,
        anchorOrigin: anchorOriginPositions,
      }}
    />
  ) : (
    <></>
  );
};

export default SnackBarMessageComponent;
