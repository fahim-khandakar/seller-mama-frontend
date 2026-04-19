import { baseApi } from '@/redux/baseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 🔹 Login
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['AUTH'],
    }),

    // 🔹 Refresh Token
    refreshToken: builder.mutation({
      query: (refreshToken) => ({
        url: '/refresh-token',
        method: 'POST',
        body: { refreshToken },
      }),
      invalidatesTags: ['AUTH'],
    }),

    // 🔹 Logout
    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
      invalidatesTags: ['AUTH'],
    }),

    // 🔹 Change Password
    changePassword: builder.mutation({
      query: (passwordData) => ({
        url: '/change-password',
        method: 'POST',
        body: passwordData,
      }),
      invalidatesTags: ['AUTH'],
    }),

    // 🔹 Set Password
    setPassword: builder.mutation({
      query: (passwordData) => ({
        url: '/set-password',
        method: 'POST',
        body: passwordData,
      }),
      invalidatesTags: ['AUTH'],
    }),

    // 🔹 Forgot Password
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: '/forgot-password',
        method: 'POST',
        body: { email },
      }),
      invalidatesTags: ['AUTH'],
    }),

    // 🔹 Reset Password
    resetPassword: builder.mutation({
      query: (resetData) => ({
        url: '/reset-password',
        method: 'POST',
        body: resetData,
      }),
      invalidatesTags: ['AUTH'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useChangePasswordMutation,
  useSetPasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
