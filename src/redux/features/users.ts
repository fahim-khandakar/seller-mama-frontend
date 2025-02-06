import baseApi from "../api/baseApi";

const UsersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: ({ fullData, token }) => {
        return {
          url: "/users",
          headers: {
            authorization: token,
          },
          method: "POST",
          body: fullData,
        };
      },
      invalidatesTags: ["user"],
    }),
    createUserByAdmin: builder.mutation({
      query: ({ fullData, token }) => {
        return {
          url: "/users/create-by-admin",
          headers: {
            authorization: token,
          },
          method: "POST",
          body: fullData,
        };
      },
      invalidatesTags: ["user"],
    }),

    getUsers: builder.query({
      query: ({ token, query }) => {
        return {
          url: `/users?${query}`,
          headers: {
            authorization: token,
          },
        };
      },
      providesTags: ["user"],
    }),

    getSingleUser: builder.query({
      query: ({ token, id }) => {
        return {
          url: `/users/${id}`,
          headers: {
            authorization: token,
          },
        };
      },
      providesTags: ["user"],
    }),

    userEdit: builder.mutation({
      query: ({ token, id, fullData }) => {
        return {
          url: `/users/${id}`,
          headers: {
            authorization: token,
          },
          method: "PATCH",
          body: fullData,
        };
      },
      invalidatesTags: ["user"],
    }),

    deleteUser: builder.mutation({
      query: ({ token, id, fullData }) => {
        return {
          url: `/users/${id}`,
          headers: {
            authorization: token,
          },
          method: "DELETE",
          body: fullData,
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetUsersQuery,
  useGetSingleUserQuery,
  useUserEditMutation,
  useDeleteUserMutation,
  useCreateUserByAdminMutation,
} = UsersApi;
