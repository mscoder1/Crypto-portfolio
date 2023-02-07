import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IFullCoinInfo } from '../Models/IFullCoinInfo';

export const portfolioAPI = createApi({
  reducerPath: 'portfolioAPI',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  tagTypes: ['PortfolioCoins'],
  endpoints: (build) => ({
    GetCoinFromPortfolio: build.query<IFullCoinInfo[], string>({
      query: () => ({
        url: 'http://localhost:4000/portfolio',
      }),
      providesTags: () => ['PortfolioCoins'],
    }),
    UpdateCoins: build.mutation<IFullCoinInfo, IFullCoinInfo>({
      query: (coin) => ({
        method: 'PUT',
        url: `http://localhost:4000/portfolio/${coin.id}`,
        body: coin,
      }),
      invalidatesTags: ['PortfolioCoins'],
    }),
    DeleteCoin: build.mutation<IFullCoinInfo, string>({
      query: (ID) => ({
        url: `http://localhost:4000/portfolio/${ID}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PortfolioCoins'],
    }),
    AddCoinToPortfolio: build.mutation<IFullCoinInfo, IFullCoinInfo>({
      query: (coin) => ({
        url: 'http://localhost:4000/portfolio',
        method: 'POST',
        body: coin,
      }),
      invalidatesTags: ['PortfolioCoins'],
    }),
  }),
});
