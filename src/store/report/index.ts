import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PoiData, PoiMedia } from "../../models/poi";

export type ReportData = Pick<
  PoiData,
  "name" | "clusterId" | "description" | "latlng"
>;

interface ReportState {
  type: "add" | "edit" | null;
  id: string | null;
  data: ReportData;
  media: PoiMedia;
}

export const initialReportPoiData: ReportData = {
  name: "",
  description: "",
  latlng: {
    latitude: 0,
    longitude: 0,
  },
  clusterId: "",
};

export const initialReportMedia: PoiMedia = {
  photoUrls: [],
};

const initialState: ReportState = {
  type: null,
  id: null,
  data: initialReportPoiData,
  media: initialReportMedia,
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
      state.id = action.payload;
    },
    updateName(state, action: PayloadAction<string>) {
      state.data.name = action.payload;
    },
    updateAddReportData(state, action: PayloadAction<Partial<ReportData>>) {
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };
    },
    updateAddReportMedia(state, action: PayloadAction<Partial<PoiMedia>>) {
      return {
        ...state,
        media: {
          ...state.media,
          ...action.payload,
        },
      };
    },
    updateEditPoiData(state, action: PayloadAction<Partial<ReportData>>) {
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
  updateAddReportMedia,
  updateEditPoiData,
} = reportSlice.actions;

export default reportSlice.reducer;
