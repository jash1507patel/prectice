import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// const transformResponse = (response) => {
//   return response;
// };
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: ({ endpoint }) => endpoint,
      providesTags: (_, __, { tags = [] }) => tags,
      // transformResponse,
      // async onQueryStarted(_, { queryFulfilled }) {
      //   try {
      //     const { data } = await queryFulfilled;
      //     console.log(data);
      //   } catch (err) {
      //     console.log(err);
      //   }
      // },
    }),
    addUser: builder.mutation({
      query: ({endpoint , payloads}) => ({
        url: endpoint,
        method: "POST",
        body: payloads,
      }),
      invalidatesTags: (_,__,{tags = []}) => tags,
    }),
    updateUser: builder.mutation({
      query: ({endpoint , payloads}) => ({
        url: endpoint,
        method: "PUT",
        body: payloads,
      }),
      invalidatesTags: (_,__,{tags = []}) => tags,
    }),
    deleteUser: builder.mutation({
      query: ({ endpoint }) => ({ 
        url: endpoint,
        method: "DELETE",
      }),
      invalidatesTags: (_,__,{ tags = [] }) => tags,
    }),
  }),
});
//

export const {
  useLazyGetUserQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = api;
