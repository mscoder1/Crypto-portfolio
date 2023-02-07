import ExactCoinPage from '../ExactCoinPage/ExactCoinPage';
import MainCoinList from '../MainPage/MainCoinList';
import PortfolioPageCheckCoins from '../PortfolioPage/PortfolioPageCheckCoins';

export const AllRoutes = [
  {
    path: '/',
    element: <MainCoinList />,
  },
  {
    path: '/portfolio',
    element: <PortfolioPageCheckCoins />,
  },
  {
    path: '/coins/:id',
    element: <ExactCoinPage />,
  },
];
