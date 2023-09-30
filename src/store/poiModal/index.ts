import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface PoiModalState {
  currentPoiId: string | null;
}

const initialState = {
  currentPoiId: null,
} as PoiModalState;

const poiModalSlice = createSlice({
  name: "poi-modal",
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
    setCurrentPoiId(state, action: PayloadAction<string>) {
      state.currentPoiId = action.payload;
    },
    resetCurrentPoiId(state) {
      state.currentPoiId = null;
    },
  },
});

export const { reset, setCurrentPoiId, resetCurrentPoiId } =
  poiModalSlice.actions;

export default poiModalSlice.reducer;
