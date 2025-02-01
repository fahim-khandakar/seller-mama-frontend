import baseApi from "../api/baseApi";

const AuthApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: ({ fullData, token }) => {
        return {
          url: "/auth/signin",
          headers: {
            authorization: token,
          },
          method: "POST",
          body: fullData,
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useSignInMutation } = AuthApi;
