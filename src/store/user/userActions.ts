import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserAuthState } from "./userState";

type loginPayloadType = { username: string; password: string };

export const login = createAsyncThunk(
  "user/login",
  async (payload: loginPayloadType): Promise<UserAuthState> => {
    return { id: "id", username: payload.username, token: "token" };
  },
);

export const logout = createAsyncThunk(
  "user/logout",
  async (): Promise<void> => {
    // TODO: logout
  },
);
