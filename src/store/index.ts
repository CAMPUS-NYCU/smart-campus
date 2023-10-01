import { configureStore } from "@reduxjs/toolkit";

import apiSlice from "../api";
import mapDrawer from "./mapDrawer";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    mapDrawer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;

export type IRootState = ReturnType<typeof store.getState>;
