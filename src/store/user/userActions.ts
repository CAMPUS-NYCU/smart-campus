import { createAsyncThunk } from "@reduxjs/toolkit";
import UserState from "./userState";

type loginPayloadType = { username: string; password: string };

export const login = createAsyncThunk(
  "user/login",
  async (payload: loginPayloadType): Promise<UserState> => {
    // TODO: login
    return { id: "id", username: payload.username, token: "token" };
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (): Promise<void> => {
    // TODO: logout
  }
);
