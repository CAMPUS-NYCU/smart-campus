import { PayloadAction, ValidateSliceCaseReducers } from "@reduxjs/toolkit";

import UserState, { initialUserState } from "./userState";

const userReducers = {
  set(state: UserState, action: PayloadAction<Partial<UserState>>) {
    return { ...state, ...action.payload };
  },
  reset() {
    return initialUserState;
  },
};

export default userReducers as ValidateSliceCaseReducers<
  UserState,
  typeof userReducers
>;
