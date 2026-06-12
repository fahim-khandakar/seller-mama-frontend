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
      query: ({ query }) => ({
        url: `/orders?${query}`,
        method: 'GET',
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
    updateOrder: builder.mutation({
      query: ({ orderId, data }) => ({
        url: `/orders/${orderId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['ORDER'],
    }),

    // 🔹 Delete Order
    deleteOrder: builder.mutation({
      query: (orderId: string) => ({
        url: `/orders/${orderId}`,
        method: 'DELETE',
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
  useDeleteOrderMutation,
  useUpdateOrderMutation,
} = orderApi;
