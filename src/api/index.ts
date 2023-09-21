import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "firebase-api",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Auth", "User", "Poi"],
  endpoints: () => ({}),
});

export default apiSlice;
