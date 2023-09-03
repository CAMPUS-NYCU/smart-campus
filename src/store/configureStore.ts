import { configureStore as RTKConfigureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./";

export default function configureStore() {
  return RTKConfigureStore({
    reducer: rootReducer,
  });
}
