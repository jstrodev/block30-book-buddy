// src/features/api/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/',
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => 'books',
      transformResponse: (response) => response.books || [], // Extract books array from response
    }),
    getSingleBook: builder.query({
      query: (id) => `books/${id}`,
      transformResponse: (response) => response.book // Extract single book from response
    }),
    checkoutBook: builder.mutation({
      query: (id) => ({
        url: `books/checkout/${id}`,
        method: 'POST',
      }),
    }),
    getAccount: builder.query({
      query: () => 'account',
    }),
    // other endpoints...
  }),
});

export const {
  useGetBooksQuery,
  useGetSingleBookQuery,
  useCheckoutBookMutation,
  useGetAccountQuery,
} = api;