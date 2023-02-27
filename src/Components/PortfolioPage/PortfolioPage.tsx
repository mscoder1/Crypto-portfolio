import { useEffect, useState } from 'react';
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
import { getPortfolioData } from './Functions/GetPortfolioData';

interface PortfolioPageProps {
  coins: IFullCoinInfo[];
}

const PortfolioPage = ({ coins }: PortfolioPageProps) => {
  const [isManage, setIsManage] = useState(false);
  const [isModalMinor, setIsModalMinor] = useState(false);
  const [sortedCoins, setSortedCoins] = useState('');

  const { initialBalance, currentBalance } = getPortfolioData(coins);

  const onManage = () => {
    setIsManage(!isManage);
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
  }, []);

  return (
    <div className={styles.PortfolioPageWrap}>
      <div className={styles.PortfolioPageTechWrap}>
        <div className={styles.PPTopWrap}>
          <PortfolioPageChangeElement
            balance={currentBalance}
            TotalProfitLoss={TotalProfitLoss}
            PNLCurrency={PNLCurrency}
          />
          <div className={styles.PPManageCoins}>
            <span className={styles.PPAddToPButton}>
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
            </span>
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
          <aside className={styles.portfolioChartWrap}>
            {coins && <PieChart balance={currentBalance} coins={coins} />}
          </aside>
        </div>
      </div>
      <ModalMinor isActive={isModalMinor} setIsActive={setIsModalMinor} />
    </div>
  );
};

export default PortfolioPage;
