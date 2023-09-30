import { configureStore } from "@reduxjs/toolkit";

import apiSlice from "../api";
import poiModal from "./poiModal";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    poiModal,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;

export type IRootState = ReturnType<typeof store.getState>;
