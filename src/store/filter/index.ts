import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface FilterState {
  filterPoiFloors: string[];
  filterPoiTargetNames: string[];
  filterPoiStatuses: string[];
}

const initialState: FilterState = {
  filterPoiFloors: [],
  filterPoiTargetNames: [],
  filterPoiStatuses: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilterPoiFloors: (state, action: PayloadAction<string[]>) => {
      state.filterPoiFloors = action.payload;
    },
    setFilterPoiTargetNames: (state, action: PayloadAction<string[]>) => {
      state.filterPoiTargetNames = action.payload;
    },
    setFilterPoiStatuses: (state, action: PayloadAction<string[]>) => {
      state.filterPoiStatuses = action.payload;
    },
  },
  // clear state
});

export const {
  setFilterPoiFloors,
  setFilterPoiTargetNames,
  setFilterPoiStatuses,
} = filterSlice.actions;

export default filterSlice.reducer;
