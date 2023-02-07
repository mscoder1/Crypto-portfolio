import { Route, Routes } from 'react-router-dom';
import MainCoinList from '../MainPage/MainCoinList';
import { AllRoutes } from './Routes';

const AppRouter = () => {
  return (
    <div>
      <Routes>
        {AllRoutes.map((route) => (
          <Route element={route.element} path={route.path} key={route.path} />
        ))}
        <Route path="*" element={<MainCoinList />} />
      </Routes>
    </div>
  );
};

export default AppRouter;
