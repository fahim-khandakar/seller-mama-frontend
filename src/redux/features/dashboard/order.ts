import { baseApi } from '@/redux/baseApi';

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 🔹 Create Order
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: '/orders',
        method: 'POST',
        body: orderData,
      }),
      invalidatesTags: ['ORDER'],
    }),

    // 🔹 Get All Orders
    getAllOrders: builder.query({
      query: (params) => ({
        url: '/orders',
        method: 'GET',
        params,
      }),
      providesTags: ['ORDER'],
    }),

    // 🔹 Get Single Order
    getSingleOrder: builder.query({
      query: (orderId: string) => ({
        url: `/orders/${orderId}`,
        method: 'GET',
      }),
      providesTags: ['ORDER'],
    }),

    // 🔹 Update Order Status
    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `/orders/${orderId}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['ORDER'],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetSingleOrderQuery,
  useUpdateOrderStatusMutation,
} = orderApi;
