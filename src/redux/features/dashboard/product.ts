import { baseApi } from '@/redux/baseApi';

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 🔹 Create Product
    createProduct: builder.mutation({
      query: (productData) => ({
        url: '/products',
        method: 'POST',
        body: productData,
      }),
      invalidatesTags: ['PRODUCT'],
    }),



    // 🔹 Get All Products
    getAllProducts: builder.query({
      query: ({query}) => ({
        url: `/products?${query}`,
        method: 'GET',
      }),
      providesTags: ['PRODUCT'],
    }),

    // 🔹 Get Single Product
    getSingleProduct: builder.query({
      query: (productId: string) => ({
        url: `/products/${productId}`,
        method: 'GET',
      }),
      providesTags: ['PRODUCT'],
    }),




    // 🔹 Update Product
    updateProduct: builder.mutation({
      query: ({ productId, data }) => ({
        url: `/products/${productId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['PRODUCT'],
    }),

    // 🔹 Delete Product
    deleteProduct: builder.mutation({
      query: (productId: string) => ({
        url: `/products/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PRODUCT'],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useGetSingleProductQuery,

  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
