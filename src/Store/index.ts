import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { coinAPI } from '../Services/CoinsService';
import { newsAPI } from '../Services/NewsService';
import { portfolioAPI } from '../Services/PortfolioService';

const rootReducer = combineReducers({
  [coinAPI.reducerPath]: coinAPI.reducer,
  [newsAPI.reducerPath]: newsAPI.reducer,
  [portfolioAPI.reducerPath]: portfolioAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
      coinAPI.middleware,
      newsAPI.middleware,
      portfolioAPI.middleware,
    ),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
