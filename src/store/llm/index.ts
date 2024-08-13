import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface RecommendState {
  recommendContributions: string[];
  refetchFlag: boolean;
  errorMessage: string;
}

const initialState: RecommendState = {
  recommendContributions: [],
  refetchFlag: false,
  errorMessage: "",
};

const recommendSlice = createSlice({
  name: "facility",
  initialState,
  reducers: {
    setRecommendContributions: (state, action: PayloadAction<string[]>) => {
      state.recommendContributions = action.payload;
    },
    toggleRefetchFlag: (state) => {
      state.refetchFlag = !state.refetchFlag;
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { setRecommendContributions, toggleRefetchFlag, setErrorMessage } =
  recommendSlice.actions;

export default recommendSlice.reducer;
