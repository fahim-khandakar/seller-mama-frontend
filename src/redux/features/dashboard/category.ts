import { baseApi } from '@/redux/baseApi';

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => ({
        url: '/categories',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['CATEGORY'],
    }),

    getAllCategories: builder.query({
      query: (query) => ({
        url: '/categories',
        method: 'GET',
        params: query,
      }),
      providesTags: ['CATEGORY'],
    }),

    getSingleCategory: builder.query({
      query: (id: string) => ({
        url: `/categories/${id}`,
        method: 'GET',
      }),
      providesTags: ['CATEGORY'],
    }),

    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/categories/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['CATEGORY'],
    }),

    deleteCategory: builder.mutation({
      query: (id: string) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CATEGORY'],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
