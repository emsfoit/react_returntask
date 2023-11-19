import { configureStore } from "@reduxjs/toolkit";
import returnReducer from "./features/return/returnSlice";

export default configureStore({
  reducer: {
    return: returnReducer,
  },
});
