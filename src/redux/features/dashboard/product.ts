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

    // 🔹 Update Product Stock
    updateProductStock: builder.mutation({
      query: ({ productId, stockData }) => ({
        url: `/products/${productId}/stock`,
        method: 'POST',
        body: stockData,
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

    // 🔹 Get Product Stock History
    getProductStockHistory: builder.query({
      query: (productId: string) => ({
        url: `/products/${productId}/stock-history`,
        method: 'GET',
      }),
      providesTags: ['PRODUCT'],
    }),

    // 🔹 Get Product Stock Summary
    getProductStockSummary: builder.query({
      query: (productId: string) => ({
        url: `/products/${productId}/stock-summary`,
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
  useUpdateProductStockMutation,
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useGetProductStockHistoryQuery,
  useGetProductStockSummaryQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
