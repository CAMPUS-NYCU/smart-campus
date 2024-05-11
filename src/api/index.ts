import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "firebase-api",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Poi", "Resource", "ResourceGroup", "User"],
  endpoints: () => ({}),
});

export default apiSlice;
