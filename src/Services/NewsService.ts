import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newsAPI = createApi({
  reducerPath: "newsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  endpoints: (build) => ({
    FetchNews: build.query({
      query: () => ({
        method: "GET",
        url: `https://crypto-news16.p.rapidapi.com/news/top/20`,
        headers: {
          "X-RapidAPI-Key":
            "33aed85385mshfda3328c36035fbp184925jsn6069548ff2bf",
          "X-RapidAPI-Host": "crypto-news16.p.rapidapi.com",
        },
      }),
    }),
  }),
});
