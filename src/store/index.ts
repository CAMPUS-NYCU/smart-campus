import { configureStore } from "@reduxjs/toolkit";

import apiSlice from "../api";
import modal from "./modal";
import report from "./report";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    modal,
    report,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;

export type IRootState = ReturnType<typeof store.getState>;
