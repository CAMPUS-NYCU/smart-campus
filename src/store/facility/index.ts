import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FacilityState {
  selectedCategories: string[];
}

const initialState: FacilityState = {
  selectedCategories: [],
};

const facilitySlice = createSlice({
  name: "facility",
  initialState,
  reducers: {
    setSelectedCategories: (state, action: PayloadAction<string[]>) => {
      state.selectedCategories = action.payload;
    },
  },
});

export const { setSelectedCategories } = facilitySlice.actions;

export default facilitySlice.reducer;
