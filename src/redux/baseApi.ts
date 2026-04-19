import envConfig from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  // baseQuery: axiosBaseQuery(),
  baseQuery: fetchBaseQuery({
    baseUrl: envConfig.baseUrl,
    credentials: 'include',
  }),
  tagTypes: ['USER', 'AUTH', 'PRODUCT', 'ORDER', 'ANALYTICS'],
  endpoints: () => ({}),
});
