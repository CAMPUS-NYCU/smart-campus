import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import DrawerType from "../../models/drawer";

interface DrawerInfo {
  type: DrawerType;
  id: string;
}

interface MapDrawerState {
  current: DrawerInfo | null;
  history: DrawerInfo[];
}

const initialState = {
  current: null,
  history: [],
} as MapDrawerState;

const mapDrawerSlice = createSlice({
  name: "map-view",
  initialState,
  reducers: {
    clearDrawerHistory() {
      return initialState;
    },
    pushDrawer(state, action: PayloadAction<DrawerInfo>) {
      if (state.current) {
        state.history = [...state.history, state.current];
      }

      state.current = action.payload;
    },
    popDrawer(state) {
      state.current = state.history.pop() || null;
    },
  },
});

export const { clearDrawerHistory, pushDrawer, popDrawer } =
  mapDrawerSlice.actions;

export default mapDrawerSlice.reducer;
