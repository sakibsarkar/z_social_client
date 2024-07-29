import { api } from "@/redux/api/appSlice";
import { IMessage } from "@/types/message";
import { TUser } from "@/types/user";

const messageApi = api.injectEndpoints({
  endpoints: (builder) => ({
    chatHeads: builder.query<{ data: TUser[] }, undefined>({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      providesTags: ["message"],
    }),
    sendMessage: builder.mutation({
      query: ({ message, id }: { message: string; id: string }) => ({
        url: `/message/send/${id}`, // the id of the the guy i want to send message
        method: "POST",
        body: { message },
      }),
      invalidatesTags: ["message"],
    }),
    getMessages: builder.query<{ data: IMessage[] }, string>({
      query: (id) => ({
        url: `/message/get/${id}`, // the id of the the guy im chatting with
        method: "GET",
      }),
      providesTags: ["message"],
    }),
    deleteMessage: builder.mutation<{ data: null }, string>({
      query: (id) => ({
        url: `/message/delete/${id}`, // the id of the the guy im chatting with
        method: "DELETE",
      }),
    }),
  }),
});
export const {
  useChatHeadsQuery,
  useSendMessageMutation,
  useGetMessagesQuery,
  useDeleteMessageMutation,
} = messageApi;
