import { baseApi } from '@/redux/baseApi';

export const mainCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createMainCategory: builder.mutation({
      query: (data) => ({
        url: '/main-categories',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['MAIN_CATEGORY'],
    }),

    getAllMainCategories: builder.query({
      query: (query) => ({
        url: '/main-categories',
        method: 'GET',
        params: query, // QueryBuilder er filter/search er jonno
      }),
      providesTags: ['MAIN_CATEGORY'],
    }),

    getSingleMainCategory: builder.query({
      query: (id: string) => ({
        url: `/main-categories/${id}`,
        method: 'GET',
      }),
      providesTags: ['MAIN_CATEGORY'],
    }),

    updateMainCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/main-categories/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['MAIN_CATEGORY'],
    }),

    deleteMainCategory: builder.mutation({
      query: (id: string) => ({
        url: `/main-categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MAIN_CATEGORY'],
    }),
  }),
});

export const {
  useCreateMainCategoryMutation,
  useGetAllMainCategoriesQuery,
  useGetSingleMainCategoryQuery,
  useUpdateMainCategoryMutation,
  useDeleteMainCategoryMutation,
} = mainCategoryApi;
