import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";

import * as userActions from "./userActions";
import userReducers from "./userReducers";
import UserState, { UserAuthState } from "./userState";

const userExtraReducers = (builder: ActionReducerMapBuilder<UserState>) => {
  builder.addCase(
    userActions.loginWithEmailAndPassword.fulfilled,
    (_: UserState, action: PayloadAction<UserAuthState>) => {
      return userReducers.set(_, { ...action });
    },
  );
  builder.addCase(userActions.loginWithEmailAndPassword.rejected, () => {
    return userReducers.reset();
  });
  builder.addCase(
    userActions.loginWithProvider.fulfilled,
    (_: UserState, action: PayloadAction<UserAuthState>) => {
      return userReducers.set(_, { ...action });
    },
  );
  builder.addCase(userActions.loginWithProvider.rejected, () => {
    return userReducers.reset();
  });
  builder.addCase(userActions.logout.fulfilled, () => {
    return userReducers.reset();
  });
};

export default userExtraReducers;
