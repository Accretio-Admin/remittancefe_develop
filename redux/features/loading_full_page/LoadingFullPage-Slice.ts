import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILoadingFullPage } from "../../../interfaces/features_redux/IFeaturesRedux.interface";

const initialState: ILoadingFullPage = {
  active: false,
  colorBackDrop: "#ffff",
};
const loadingFullPageSlice = createSlice({
  name: "loading_full_page",
  initialState,
  reducers: {
    setShowFullPage(state, action: PayloadAction<ILoadingFullPage>) {
      state.active = action.payload.active;
      state.colorBackDrop = action.payload.colorBackDrop
        ? action.payload.colorBackDrop
        : state.colorBackDrop;
    },
    setOffFullPage(state) {
      state.active = false;
    },
  },
});
export const { setShowFullPage, setOffFullPage } = loadingFullPageSlice.actions;
export default loadingFullPageSlice.reducer;
