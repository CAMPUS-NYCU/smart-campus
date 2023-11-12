import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import Poi, {
  PoiData,
  PoiMedia,
  PoiStatusValue,
  PoiStatusType,
} from "../../models/poi";
import { poiStatusValue, poiStatusType } from "../../constants/model/poi";

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
    type: poiStatusType.unknown as PoiStatusType,
    value: poiStatusValue.unknown as PoiStatusValue,
  },
  createdAt: "",
  createdBy: "",
  updatedAt: "",
  updatedBy: "",
  photoUrls: [],
};

export const initialReportMedia: PoiMedia = {
  photoUrls: [],
};

const initialState: ReportState = {
  type: null,
  id: "",
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
    updateAddReportMedia(state, action: PayloadAction<Partial<PoiMedia>>) {
      return {
        ...state,
        media: {
          ...state.media,
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
  updateAddReportMedia,
  updateEditPoiData,
} = reportSlice.actions;

export default reportSlice.reducer;
