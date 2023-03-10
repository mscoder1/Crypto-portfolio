import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IFullCoinInfo } from '../Models/IFullCoinInfo';

const PORT = process.env.REACT_APP_JSON_SERVER_PORT;

export const portfolioAPI = createApi({
  reducerPath: 'portfolioAPI',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  tagTypes: ['PortfolioCoins'],
  endpoints: (build) => ({
    GetCoinFromPortfolio: build.query<IFullCoinInfo[], string>({
      query: () => ({
        url: `http://localhost:${PORT}/portfolio`,
      }),
      providesTags: () => ['PortfolioCoins'],
    }),
    UpdateCoins: build.mutation<IFullCoinInfo, IFullCoinInfo>({
      query: (coin) => ({
        method: 'PUT',
        url: `http://localhost:${PORT}/portfolio/${coin.id}`,
        body: coin,
      }),
      invalidatesTags: ['PortfolioCoins'],
    }),
    DeleteCoin: build.mutation<IFullCoinInfo, string>({
      query: (ID) => ({
        url: `http://localhost:${PORT}/portfolio/${ID}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PortfolioCoins'],
    }),
    AddCoinToPortfolio: build.mutation<IFullCoinInfo, IFullCoinInfo>({
      query: (coin) => ({
        url: `http://localhost:${PORT}/portfolio`,
        method: 'POST',
        body: coin,
      }),
      invalidatesTags: ['PortfolioCoins'],
    }),
  }),
});
