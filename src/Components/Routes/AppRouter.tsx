import { Route, Routes } from 'react-router-dom';
import MainCoinList from '../MainPage/MainCoinList';
import { AllRoutes } from './Routes';

const AppRouter = () => {
  return (
    <div style={{
      width: '100%', height: '100vh', backgroundColor: '#FDFDF6', display: 'flex', justifyContent: 'center',
    }}
    >
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
