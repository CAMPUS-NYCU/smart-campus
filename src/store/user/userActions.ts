import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  AuthProvider,
  UserCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { firebaseAuth } from "../../utils/firebase";
import { UserAuthState, initialUserAuthState } from "./userState";

const toUserAuthState = async (
  userCredential: UserCredential,
): Promise<UserAuthState> => ({
  id: userCredential.user.uid,
  idToken: await userCredential.user.getIdToken(),
  username: userCredential.user.email,
  displayName: userCredential.user.displayName,
});

export const loginWithEmailAndPassword = createAsyncThunk(
  "user/login-with-email-and-password",
  async (
    args: { email: string; password: string },
    { rejectWithValue },
  ): Promise<UserAuthState> => {
    let userAuthState = initialUserAuthState;
    try {
      userAuthState = await signInWithEmailAndPassword(
        firebaseAuth,
        args.email,
        args.password,
      ).then(toUserAuthState);
    } catch (error) {
      rejectWithValue(error);
    }
    return userAuthState;
  },
);

export const loginWithProvider = createAsyncThunk(
  "user/login-with-provider",
  async (
    args: { provider: AuthProvider },
    { rejectWithValue },
  ): Promise<UserAuthState> => {
    let userAuthState = initialUserAuthState;
    try {
      userAuthState = await signInWithPopup(firebaseAuth, args.provider).then(
        toUserAuthState,
      );
    } catch (error) {
      rejectWithValue(error);
    }
    return userAuthState;
  },
);

export const logout = createAsyncThunk("user/logout", async () =>
  signOut(firebaseAuth),
);
