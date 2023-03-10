import { portfolioAPI } from '../../Services/PortfolioService';
import AddButton from './MinorElements/AddButton/AddButton';
import PortfolioPage from './PortfolioPage';
import styles from './PortfolioPageCheckCoins.module.css';

const PortfolioPageCheckCoins = () => {
  // Используем хук useGetCoinFromPortfolioQuery для получения данных о монетах из портфеля
  const { data: coins } = portfolioAPI.useGetCoinFromPortfolioQuery('');
  // Если данные отсутствуют, показываем соответствующее сообщение и кнопку AddButton
  // Иначе, передаем данные о монетах в компонент PortfolioPage
  return (
    <div className={styles.PortfolioPageCheckCoinsMainWrap}>
      {coins === undefined || coins?.length === 0 ? (
        <div className={styles.PortfolioPageCheckCoinsMinorWrap}>
          Add coins to see more information
          <AddButton />
        </div>
      ) : (
        <PortfolioPage coins={coins} />
      )}
    </div>
  );
};

export default PortfolioPageCheckCoins;
