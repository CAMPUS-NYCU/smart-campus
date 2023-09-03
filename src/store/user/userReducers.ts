import { PayloadAction, ValidateSliceCaseReducers } from "@reduxjs/toolkit";

import UserState, {initialUserState } from "./userState";

const userReducers = {
  set(_: UserState, action: PayloadAction<UserState>) {
    return action.payload;
  },
  reset() {
    return initialUserState;
  },
};

export default userReducers as ValidateSliceCaseReducers<
  UserState,
  typeof userReducers
>;
