import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface RecommandState {
  recommandContributions: string[];
  refetchFlag: boolean;
}

const initialState: RecommandState = {
  recommandContributions: [],
  refetchFlag: false,
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
  },
});

export const { setRecommandContributions, toggleRefetchFlag } =
  recommandSlice.actions;

export default recommandSlice.reducer;
