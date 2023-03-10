import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IFullCoinInfo } from '../Models/IFullCoinInfo';

export const coinAPI = createApi({
  reducerPath: 'coinAPI',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (build) => ({
    FetchAllCoins: build.query({
      query: (page) => ({
        url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${page}&sparkline=false`,
      }),
    }),
    FetchExactCoin: build.query<IFullCoinInfo[], string>({
      query: (id) => ({
        url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
      }),
    }),
    SearchCoin: build.query({
      query: () => ({
        url: 'https://api.coingecko.com/api/v3/coins/list',
      }),
    }),
    FetchExactCoinChart: build.query({
      query: (coin) => ({
        url: `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=${coin.time}`,
      }),
    }),
  }),
});
