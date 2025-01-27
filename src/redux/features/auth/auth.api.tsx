import { api } from "@/redux/api/appSlice";
import { TUser } from "@/types/user";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Create blog post
    registerCustomer: builder.mutation({
      query: (post) => ({
        url: "/auth/signup",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["user"],
    }),
    loginUser: builder.mutation({
      query: (post: { email: string; password: string }) => ({
        url: "/auth/login",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["user"],
    }),
    resetPassword: builder.mutation({
      query: (payload: { oldPassword: string; password: string }) => ({
        url: "/auth/reset-password",
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["user"],
    }),
    getAuthor: builder.query<{ data: TUser }, string>({
      query: (token) => {
        return {
          url: `/auth/auth-state`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["user"],
    }),
  }),
});
export const {
  useRegisterCustomerMutation,
  useLoginUserMutation,
  useGetAuthorQuery,
  useResetPasswordMutation,
} = userApi;
