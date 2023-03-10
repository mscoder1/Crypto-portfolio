import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const newsAPI = createApi({
  reducerPath: 'newsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (build) => ({
    FetchNews: build.query({
      query: () => ({
        method: 'GET',
        url: 'https://crypto-news16.p.rapidapi.com/news/top/20',
        headers: {
          'X-RapidAPI-Key':
            process.env.REACT_APP_NEWS_API_KEY,
          'X-RapidAPI-Host': 'crypto-news16.p.rapidapi.com',
        },
      }),
    }),
  }),
});
