import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import { firebaseAuth } from "../../utils/firebase";
import { UserAuthState, initialUserAuthState } from "./userState";

export const loginWithEmailAndPassword = createAsyncThunk(
  "user/login-with-email-and-password",
  async (
    args: { email: string; password: string },
    { rejectWithValue },
  ): Promise<UserAuthState> => {
    let userAuthState = initialUserAuthState;
    try {
      const user = await signInWithEmailAndPassword(
        firebaseAuth,
        args.email,
        args.password,
      ).then((userCredential) => {
        const user = userCredential.user;
        return user;
      });

      userAuthState = {
        id: user.uid,
        idToken: await user.getIdToken(),
        username: user.email,
        displayName: user.displayName,
      };
    } catch (error) {
      rejectWithValue(error);
    }
    return userAuthState;
  },
);

export const logout = createAsyncThunk("user/logout", async () =>
  signOut(firebaseAuth),
);
