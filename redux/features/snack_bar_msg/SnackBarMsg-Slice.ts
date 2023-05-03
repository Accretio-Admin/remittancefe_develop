import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISnackBarMsg } from "../../../interfaces/features_redux/IFeaturesRedux.interface";

const initialState: ISnackBarMsg = {
  msg: "",
  openMsg: false,
  timeAutoHide: 3000,
  severity: "success",
  anchorOriginPositions: { horizontal: "left", vertical: "bottom" },
};
const snackBarMsgSlice = createSlice({
  name: "snack_bar_msg",
  initialState,
  reducers: {
    setShowSnackBar(state, action: PayloadAction<ISnackBarMsg>) {
      state.msg = action.payload.msg;
      state.openMsg = action.payload.openMsg;
      state.timeAutoHide = action.payload.timeAutoHide;
      state.severity = action.payload.severity;
      state.anchorOriginPositions = action.payload.anchorOriginPositions;
    },
    setOffSnackBar(state) {
      state.msg = "";
      state.openMsg = false;
      state.timeAutoHide = 3000;
      state.anchorOriginPositions = { horizontal: "left", vertical: "bottom" };
    },
  },
});
export const { setShowSnackBar, setOffSnackBar } = snackBarMsgSlice.actions;
export default snackBarMsgSlice.reducer;
