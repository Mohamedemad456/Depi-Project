import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import workSpaceSlice from "./WorkspaceSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    workSpace:workSpaceSlice.reducer
  },
});
export default store;
