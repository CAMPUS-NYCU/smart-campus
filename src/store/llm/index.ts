import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface RecommendState {
  recommendContributions: string[];
  recommendLoading: boolean;
  errorMessage: string;
}

const initialState: RecommendState = {
  recommendContributions: [],
  recommendLoading: false,
  errorMessage: "",
};

const recommendSlice = createSlice({
  name: "facility",
  initialState,
  reducers: {
    setRecommendContributions: (state, action: PayloadAction<string[]>) => {
      state.recommendContributions = action.payload;
    },
    setRecommendLoading: (state, action: PayloadAction<boolean>) => {
      state.recommendLoading = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
  },
});

export const {
  setRecommendContributions,
  setRecommendLoading,
  setErrorMessage,
} = recommendSlice.actions;

export default recommendSlice.reducer;
