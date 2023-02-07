import { useEffect, useMemo, useState } from 'react';
import { IFullCoinInfo } from '../../Models/IFullCoinInfo';
import styles from './PortfolioPage.module.css';
import PieChart from './PieChart/PieChart';
import ExactPortfolioCoin from './ExactPortfolioCoin/ExactPortfolioCoinBlock';
import ModalMinor from '../ModalMinor/ModalMinor';
import { Reconciliation } from './ReconciliationFunction';
import MySort from '../Sort/MySort';
import { TopInfoBlock } from './MinorElements/TopInfoBlock/TopInfoBlock';
import { PortfolioPageChangeElement } from './MinorElements/PortfolioPageChangeElement/PortfolioPageChangeElement';
import AddButton from './MinorElements/AddButton/AddButton';
import { SortOptions } from './SortOption/SortOptions';

interface PortfolioPageProps {
  coins: IFullCoinInfo[];
}

const PortfolioPage = ({ coins }: PortfolioPageProps) => {
  const [initialBalance, setInitialBalance] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [isManage, setIsManage] = useState(false);
  const [isModalMinor, setIsModalMinor] = useState(false);
  const [balance, setBalance] = useState(0);

  const [sortedCoins, setSortedCoins] = useState('');

  const getBalances = (portfolio: IFullCoinInfo[]) => {
    portfolio?.forEach((element) => {
      setBalance((balance) => {
        return element.quantity
          ? balance + element.current_price * element.quantity
          : balance + element.current_price;
      });
    });
  };

  const getTotalProfit = (portfolio: IFullCoinInfo[]) => {
    return portfolio?.forEach((element) => {
      if (element.buy_price && element.quantity) {
        const initBlc = element.buy_price * element.quantity;
        const currBlc = element.current_price * element.quantity;
        setInitialBalance((initialBalance) => +initialBalance + initBlc);
        setCurrentBalance((currentBalance) => +currentBalance + currBlc);
      }
    });
  };

  const onManage = () => {
    return !isManage ? setIsManage(true) : setIsManage(false);
  };

  const TotalProfitLoss = (currentBalance - initialBalance) / (initialBalance / 100);

  const PNLCurrency = currentBalance - initialBalance;

  const sortCoins = () => {
    return (
      coins
      && [...coins].sort((a, b) => {
        return (b as any)[sortedCoins] - (a as any)[sortedCoins];
      })
    );
  };

  useEffect(() => {
    Reconciliation(coins as []);
  }, [coins, sortedCoins]);

  useMemo(() => {
    setInitialBalance(0);
    setCurrentBalance(0);
    setBalance(0);
    getBalances(coins as []);
    getTotalProfit(coins as []);
  }, [coins]);

  return (
    <div className={styles.PortfolioPageWrap}>
      <div className={styles.PortfolioPageTechWrap}>
        <div className={styles.PPTopWrap}>
          <PortfolioPageChangeElement
            balance={balance}
            TotalProfitLoss={TotalProfitLoss}
            PNLCurrency={PNLCurrency}
          />
          <div className={styles.PPManageCoins}>
            <div className={styles.PPAddToPButton}>
              <button
                type="button"
                onClick={() => onManage()}
                className={
                  isManage
                    ? styles.PPAddBlockButtonAddActive
                    : styles.PPAddBlockButtonAdd
                }
              >
                Manage
              </button>
            </div>
            <AddButton />
          </div>
        </div>
        <div className={styles.portfolioMainInfoWrap}>
          <div className={styles.coinsCardWrap}>
            <MySort
              value={sortedCoins}
              onChange={(sort) => setSortedCoins(sort)}
              defaultValue="Sort"
              options={SortOptions}
            />
            <TopInfoBlock />
            <div className={styles.portfolioCardsWrap}>
              {sortedCoins
                ? sortCoins()?.map((coin: IFullCoinInfo) => (
                  <ExactPortfolioCoin
                    key={coin.id}
                    coin={coin}
                    isManage={isManage}
                  />
                ))
                : coins?.map((coin: IFullCoinInfo) => (
                  <ExactPortfolioCoin
                    key={coin.id}
                    coin={coin}
                    isManage={isManage}
                  />
                ))}
            </div>
          </div>
          <div className={styles.portfolioChartWrap}>
            {coins && <PieChart balance={balance} coins={coins} />}
          </div>
        </div>
      </div>
      <ModalMinor isActive={isModalMinor} setIsActive={setIsModalMinor} />
    </div>
  );
};

export default PortfolioPage;
