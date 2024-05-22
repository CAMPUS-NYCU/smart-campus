import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface RecommandState {
  recommandContributions: string[];
  refetchFlag: boolean;
  errorMessage: string;
}

const initialState: RecommandState = {
  recommandContributions: [],
  refetchFlag: false,
  errorMessage: "",
};

const recommandSlice = createSlice({
  name: "facility",
  initialState,
  reducers: {
    setRecommandContributions: (state, action: PayloadAction<string[]>) => {
      state.recommandContributions = action.payload;
    },
    toggleRefetchFlag: (state) => {
      state.refetchFlag = !state.refetchFlag;
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { setRecommandContributions, toggleRefetchFlag, setErrorMessage } =
  recommandSlice.actions;

export default recommandSlice.reducer;
