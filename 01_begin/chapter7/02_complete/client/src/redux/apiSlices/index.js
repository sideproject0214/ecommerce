import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FRONT_ADDRESS } from "../../config/variables";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${FRONT_ADDRESS}/api`,
  }),
  tagTypes: ["Post", "User", "Auth", "Address", "Admin"],
  endpoints: (builder) => ({}),
});
