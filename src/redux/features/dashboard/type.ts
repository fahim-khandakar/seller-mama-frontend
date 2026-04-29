import { baseApi } from '@/redux/baseApi';

export const typeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createType: builder.mutation({
      query: (data) => ({
        url: '/types',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['TYPE'],
    }),

    getAllTypes: builder.query({
      query: (query) => ({
        url: '/types',
        method: 'GET',
        params: query,
      }),
      providesTags: ['TYPE'],
    }),

    getSingleType: builder.query({
      query: (id: string) => ({
        url: `/types/${id}`,
        method: 'GET',
      }),
      providesTags: ['TYPE'],
    }),

    updateType: builder.mutation({
      query: ({ id, data }) => ({
        url: `/types/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['TYPE'],
    }),

    deleteType: builder.mutation({
      query: (id: string) => ({
        url: `/types/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['TYPE'],
    }),
  }),
});

export const {
  useCreateTypeMutation,
  useGetAllTypesQuery,
  useGetSingleTypeQuery,
  useUpdateTypeMutation,
  useDeleteTypeMutation,
} = typeApi;
