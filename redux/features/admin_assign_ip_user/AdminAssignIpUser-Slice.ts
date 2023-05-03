import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAdminAssignIpUser } from "../../../interfaces/features_redux/IFeaturesRedux.interface";

const initialState: IAdminAssignIpUser = {
  idColum: "",
  limitTypeColum: "",
  valueColum: "",
  modeEdit: false,
  updateTableAssignIpUser: false,
};
const adminAssignIpUserSlice = createSlice({
  name: "admin_assign_ip_user",
  initialState,
  reducers: {
    setValueEditAssignIpUser(state, action: PayloadAction<IAdminAssignIpUser>) {
      state.idColum = action.payload.idColum;
      state.limitTypeColum = action.payload.limitTypeColum;
      state.valueColum = action.payload.valueColum;
      state.modeEdit = true;
    },
    setResetValueEditAssignIpUser(state) {
      state.idColum = "";
      state.limitTypeColum = "";
      state.valueColum = "";
      state.modeEdit = false;
    },
    setListenerUpdateTableAssignIpUser(state, action: PayloadAction<boolean>) {
      state.updateTableAssignIpUser = action.payload;
    },
  },
});
export const {
  setValueEditAssignIpUser,
  setResetValueEditAssignIpUser,
  setListenerUpdateTableAssignIpUser,
} = adminAssignIpUserSlice.actions;
export default adminAssignIpUserSlice.reducer;
