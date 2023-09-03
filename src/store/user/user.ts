import { createSlice } from "@reduxjs/toolkit";

import UserState, { initialUserState } from "./userState";
import * as userActions from "./userActions";
import userReducers from "./userReducers";
import userExtraReducers from "./userExtraReducers";

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: userReducers,
  extraReducers: userExtraReducers,
});

export type { UserState };

export const actions = {
  ...userActions,
  ...userSlice.actions,
}

export const reducer = userSlice.reducer;