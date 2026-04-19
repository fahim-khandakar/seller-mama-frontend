import { baseApi } from '@/redux/baseApi';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 🔹 Register User
    registerUser: builder.mutation({
      query: (userInfo) => ({
        url: '/user/register',
        method: 'POST',
        body: userInfo,
      }),
      invalidatesTags: ['USER'],
    }),

    // 🔹 Get All Users (Admin / Super Admin)
    getAllUsers: builder.query({
      query: () => ({
        url: '/user/all-users',
        method: 'GET',
      }),
      providesTags: ['USER'],
    }),
    // 🔹 Get All customers
    getAllCustomers: builder.query({
      query: () => ({
        url: '/user/all-customers',
        method: 'GET',
      }),
      providesTags: ['USER'],
    }),

    // 🔹 Get Logged In User
    getMe: builder.query({
      query: () => ({
        url: '/user/me',
        method: 'GET',
      }),
      providesTags: ['USER'],
    }),

    // 🔹 Get Single User By ID
    getSingleUser: builder.query({
      query: (id: string) => ({
        url: `/user/${id}`,
        method: 'GET',
      }),
      providesTags: ['USER'],
    }),

    // 🔹 Update User
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/user/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['USER'],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useGetAllUsersQuery,
  useGetMeQuery,
  useGetSingleUserQuery,
  useUpdateUserMutation,
  useGetAllCustomersQuery,
} = userApi;
