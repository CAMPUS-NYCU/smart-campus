import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface MapDrawerState {
  currentClusterId: string | null;
  currentPoiId: string | null;
}

const initialState = {
  currentClusterId: null,
  currentPoiId: null,
} as MapDrawerState;

const mapDrawerSlice = createSlice({
  name: "map-view",
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
    setCurrentClusterId(state, action: PayloadAction<string>) {
      state.currentClusterId = action.payload;
    },
    resetCurrentClusterId(state) {
      state.currentClusterId = null;
    },
    setCurrentPoiId(state, action: PayloadAction<string>) {
      state.currentPoiId = action.payload;
    },
    resetCurrentPoiId(state) {
      state.currentPoiId = null;
    },
  },
});

export const {
  reset,
  setCurrentClusterId,
  resetCurrentClusterId,
  setCurrentPoiId,
  resetCurrentPoiId,
} = mapDrawerSlice.actions;

export default mapDrawerSlice.reducer;
