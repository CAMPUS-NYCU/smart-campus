import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import Poi, {
  PoiData,
  PoiMedia,
  PoiStatusDescription,
  PoiStatusName,
} from "../../models/poi";
import { poiStatusDescription, poiStatusName } from "../../constants/model/poi";
import moment from "moment";

interface ReportState extends Poi {
  type: "add" | "edit" | null;
}

export const initialReportPoiData: PoiData = {
  target: {
    type: "",
    name: "",
    description: "",
  },
  latlng: {
    latitude: 0,
    longitude: 0,
  },
  clusterId: "",
  status: {
    name: poiStatusName.unknown as PoiStatusName,
    description: poiStatusDescription.comfortable as PoiStatusDescription,
  },
  createBy: "",
  floor: "",
  lastUpdatedTime: moment().toISOString(),
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
      action: PayloadAction<{ clusterId: string; createBy: string }>,
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
