import baseApi from "../api/baseApi";

const ProductsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: ({ fullData, token }) => {
        return {
          url: "/products",
          headers: {
            authorization: token,
          },
          method: "POST",
          body: fullData,
        };
      },
      invalidatesTags: ["product"],
    }),

    getProducts: builder.query({
      query: ({ token, query }) => {
        return {
          url: `/products?${query}`,
          headers: {
            authorization: token,
          },
        };
      },
      providesTags: ["product"],
    }),

    getSingleProduct: builder.query({
      query: ({ token, id }) => {
        return {
          url: `/products/${id}`,
          headers: {
            authorization: token,
          },
        };
      },
      providesTags: ["product"],
    }),

    productEdit: builder.mutation({
      query: ({ token, id, fullData }) => {
        return {
          url: `/products/${id}`,
          headers: {
            authorization: token,
          },
          method: "PATCH",
          body: fullData,
        };
      },
      invalidatesTags: ["product"],
    }),

    deleteProduct: builder.mutation({
      query: ({ token, id, fullData }) => {
        return {
          url: `/products/${id}`,
          headers: {
            authorization: token,
          },
          method: "DELETE",
          body: fullData,
        };
      },
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useGetSingleProductQuery,
} = ProductsApi;
