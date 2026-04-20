import { baseApi } from '@/redux/baseApi';

export const analyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 🔹 Get Analytics Summary
    getAnalyticsSummary: builder.query({
      query: ({query}) => ({
        url: `/analytics/summary?${query}`,
        method: 'GET',
      }),
      providesTags: ['ANALYTICS'],
    }),
  }),
});

export const { useGetAnalyticsSummaryQuery } = analyticsApi;
