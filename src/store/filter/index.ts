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
    resetFilterPoiFloors: (state) => {
      state.filterPoiFloors = [];
    },
    resetFilterPoiTargetNames: (state) => {
      state.filterPoiTargetNames = [];
    },
    resetFilterPoiStatuses: (state) => {
      state.filterPoiStatuses = [];
    },
  },
});

export const {
  setFilterPoiFloors,
  setFilterPoiTargetNames,
  setFilterPoiStatuses,
  resetFilterPoiFloors,
  resetFilterPoiTargetNames,
  resetFilterPoiStatuses,
} = filterSlice.actions;

export default filterSlice.reducer;
