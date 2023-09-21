import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Document {
  id: number;
  title: string;
  content: string;
}

export const firestoreApi = createApi({
  reducerPath: "firestore-api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getDocuments: builder.query<Document[], void>({
      query: () => "/documents",
    }),
    getDocument: builder.query<Document, number>({
      query: (id) => `/documents/${id}`,
    }),
    createDocument: builder.mutation<
      Document,
      { title: string; content: string }
    >({
      query: (body) => ({
        url: "/documents",
        method: "POST",
        body,
      }),
    }),
    modifyDocument: builder.mutation<
      Document,
      { id: number; title: string; content: string }
    >({
      query: ({ id, title, content }) => ({
        url: `/documents/${id}`,
        method: "PUT",
        body: { title, content },
      }),
    }),
    deleteDocument: builder.mutation<Document, number>({
      query: (id) => ({
        url: `/documents/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetDocumentsQuery,
  useGetDocumentQuery,
  useCreateDocumentMutation,
  useModifyDocumentMutation,
  useDeleteDocumentMutation,
} = firestoreApi;
