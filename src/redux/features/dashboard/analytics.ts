import { baseApi } from '@/redux/baseApi';

export const analyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 🔹 Get Analytics Summary
    getAnalyticsSummary: builder.query({
      query: (params) => ({
        url: '/analytics/summary',
        method: 'GET',
        params,
      }),
      providesTags: ['ANALYTICS'],
    }),
  }),
});

export const { useGetAnalyticsSummaryQuery } = analyticsApi;
