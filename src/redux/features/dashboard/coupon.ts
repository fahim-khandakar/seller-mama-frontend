import { baseApi } from '@/redux/baseApi';

export const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * 🔥 Create Coupon (Admin)
     */
    createCoupon: builder.mutation({
      query: (couponData) => ({
        url: '/coupons',
        method: 'POST',
        body: couponData,
      }),
      invalidatesTags: ['COUPON'],
    }),

    /**
     * 🔥 Get All Coupons (Admin)
     */
    getAllCoupons: builder.query({
      query: () => ({
        url: '/coupons',
        method: 'GET',
      }),
      providesTags: ['COUPON'],
    }),

    /**
     * 🔥 Get Single Coupon
     */
    getSingleCoupon: builder.query({
      query: (id: string) => ({
        url: `/coupons/${id}`,
        method: 'GET',
      }),
      providesTags: ['COUPON'],
    }),

    /**
     * 🔥 Update Coupon
     */
    updateCoupon: builder.mutation({
      query: ({ id, data }) => ({
        url: `/coupons/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['COUPON'],
    }),

    /**
     * 🔥 Delete / Deactivate Coupon
     */
    deleteCoupon: builder.mutation({
      query: (id: string) => ({
        url: `/coupons/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['COUPON'],
    }),

    /**
     * 🔥 Apply Coupon (Checkout / Cart)
     */
    applyCoupon: builder.mutation({
      query: ({ code, orderAmount }) => ({
        url: '/coupons/apply',
        method: 'POST',
        body: { code, orderAmount },
      }),
    }),
  }),
});

export const {
  useCreateCouponMutation,
  useGetAllCouponsQuery,
  useGetSingleCouponQuery,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
  useApplyCouponMutation,
} = couponApi;
