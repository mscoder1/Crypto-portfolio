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

  const {
    initialBalance: iinitialBalance,
    currentBalance: ccurrentBalance,
  } = getPortfolioData(coins);

  const onManage = () => {
    setIsManage(!isManage);
  };

  const TotalProfitLoss = (ccurrentBalance - iinitialBalance) / (iinitialBalance / 100);

  const PNLCurrency = ccurrentBalance - iinitialBalance;

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
            balance={ccurrentBalance}
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
            {coins && <PieChart balance={ccurrentBalance} coins={coins} />}
          </div>
        </div>
      </div>
      <ModalMinor isActive={isModalMinor} setIsActive={setIsModalMinor} />
    </div>
  );
};

export default PortfolioPage;
