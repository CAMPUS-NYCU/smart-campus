import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface RecommandState {
  recommandContributions: string[];
}

const initialState: RecommandState = {
  recommandContributions: [],
};

const recommandSlice = createSlice({
  name: "facility",
  initialState,
  reducers: {
    setRecommandContributions: (state, action: PayloadAction<string[]>) => {
      state.recommandContributions = action.payload;
    },
  },
});

export const { setRecommandContributions } = recommandSlice.actions;

export default recommandSlice.reducer;
