import { configureStore } from "@reduxjs/toolkit";

import apiSlice from "../api";
import facility from "./facility";
import modal from "./modal";
import poi from "./poi";
import report from "./report";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    facility,
    modal,
    poi,
    report,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;

export type IRootState = ReturnType<typeof store.getState>;
