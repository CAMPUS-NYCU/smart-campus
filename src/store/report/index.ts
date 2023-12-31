import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import Poi, { PoiData } from "../../models/poi";

interface ReportState extends Poi {
  type: "add" | "edit" | null;
}

export const initialReportPoiData: PoiData = {
  clusterId: "",
  floor: "",
  latlng: {
    latitude: 0,
    longitude: 0,
  },
  target: {
    category: "",
    name: "",
    serial: "",
  },
  status: {
    type: "",
    value: "",
  },
  createdAt: "",
  createdBy: "",
  updatedAt: "",
  updatedBy: "",
  photoPaths: [],
};

const initialState: ReportState = {
  type: null,
  id: "",
  data: initialReportPoiData,
};

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    resetReport() {
      return initialState;
    },
    addReport(
      state,
      action: PayloadAction<{ clusterId: string; createdBy: string }>,
    ) {
      return {
        ...state,
        type: "add",
        data: {
          ...state.data,
          ...action.payload,
        },
      };
    },
    editReport(state, action: PayloadAction<Poi>) {
      return {
        ...state,
        type: "edit",
        ...action.payload,
      };
    },
    updateAddReportData(state, action: PayloadAction<Partial<PoiData>>) {
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };
    },
    updateEditPoiData(state, action: PayloadAction<Partial<PoiData>>) {
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };
    },
  },
});

export const {
  resetReport,
  addReport,
  editReport,
  updateAddReportData,
  updateEditPoiData,
} = reportSlice.actions;

export default reportSlice.reducer;
