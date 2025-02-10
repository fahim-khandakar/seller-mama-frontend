import { SERVER_URL } from "@/shared/secrets";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_URL,
  }),
  tagTypes: ["user", "product"],
  endpoints: () => ({}),
});

export default baseApi;
