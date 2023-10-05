import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type ReportData = {
  name: string;
  poiId: string;
  clusterId: string;
  description: string;
  latlng: {
    latitude: number;
    longitude: number;
  };
};

interface ReportState {
  type: "add" | "edit" | null;
  data: ReportData;
}

export type AddReportData = Pick<
  ReportData,
  "name" | "clusterId" | "description" | "latlng"
>;

export const initialAddReportData: AddReportData = {
  name: "",
  description: "",
  latlng: {
    latitude: 0,
    longitude: 0,
  },
  clusterId: "",
};

export type EditReportData = Pick<
  ReportData,
  "name" | "poiId" | "clusterId" | "description" | "latlng"
>;

export const initialEditReportData: EditReportData = {
  name: "",
  poiId: "",
  description: "",
  latlng: {
    latitude: 0,
    longitude: 0,
  },
  clusterId: "",
};

const initialState: ReportState = {
  type: null,
  data: {
    name: "",
    poiId: "",
    clusterId: "",
    description: "",
    latlng: {
      latitude: 0,
      longitude: 0,
    },
  },
};

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    resetReport() {
      return initialState;
    },
    addReport(state, action: PayloadAction<string>) {
      state.type = "add";
      state.data.clusterId = action.payload;
    },
    editReport(state, action: PayloadAction<string>) {
      state.type = "edit";
      state.data.poiId = action.payload;
    },
    updateName(state, action: PayloadAction<string>) {
      state.data.name = action.payload;
    },
    updateAddReportData(state, action: PayloadAction<Partial<AddReportData>>) {
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };
    },
    updateEditReportData(
      state,
      action: PayloadAction<Partial<EditReportData>>,
    ) {
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
  updateName,
  updateAddReportData,
  updateEditReportData,
} = reportSlice.actions;

export default reportSlice.reducer;
