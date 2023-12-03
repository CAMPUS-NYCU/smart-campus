import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PoiState {
  highlightId: string | null;
}

const initialState: PoiState = {
  highlightId: null,
};

const poiSlice = createSlice({
  name: "poi",
  initialState,
  reducers: {
    setHighlightId: (state, action: PayloadAction<string>) => {
      state.highlightId = action.payload;
    },
    resetHightlightId: (state) => {
      state.highlightId = null;
    },
  },
});

export const { setHighlightId, resetHightlightId } = poiSlice.actions;

export default poiSlice.reducer;
