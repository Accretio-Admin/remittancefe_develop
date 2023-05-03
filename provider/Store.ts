import { configureStore } from "@reduxjs/toolkit";
import AdminAssignIpUserSlice from "../redux/features/admin_assign_ip_user/AdminAssignIpUser-Slice";
import LoadingFullPageSlice from "../redux/features/loading_full_page/LoadingFullPage-Slice";
import SnackBarMsgSlice from "../redux/features/snack_bar_msg/SnackBarMsg-Slice";
export const store = configureStore({
  reducer: {
    loading_full_page: LoadingFullPageSlice,
    snack_bar_msg: SnackBarMsgSlice,
    admin_assign_ip_user: AdminAssignIpUserSlice,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
