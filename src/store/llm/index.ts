import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface RecommendState {
  recommendContributions: string[];
  errorMessage: string;
}

const initialState: RecommendState = {
  recommendContributions: [],
  errorMessage: "",
};

const recommendSlice = createSlice({
  name: "facility",
  initialState,
  reducers: {
    setRecommendContributions: (state, action: PayloadAction<string[]>) => {
      state.recommendContributions = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { setRecommendContributions, setErrorMessage } =
  recommendSlice.actions;

export default recommendSlice.reducer;
