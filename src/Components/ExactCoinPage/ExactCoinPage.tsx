import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { coinAPI } from '../../Services/CoinsService';
import { portfolioAPI } from '../../Services/PortfolioService';
import Charts from './ExactCoinChart/ExactCoinChart';
import ExactAddBlock from './ExactAddBlock/ExactAddBlock';
import styles from './ExactCoinPage.module.css';
import LoadingCoinPage from '../UI/LoadingCoinPage/LoadingCoinPage';
import NoRequests from '../UI/NoRequests/NoRequests';

const ExactCoinPage = () => {
  const params = useParams();
  const [isAdded, setIsAdded] = useState(false);
  const { data, isLoading, error } = coinAPI.useFetchExactCoinQuery(`${params.id}`);
  const { data: portfolioCoins } = portfolioAPI.useGetCoinFromPortfolioQuery('');

  const checkIsAdded = () => {
    if (data && portfolioCoins) {
      portfolioCoins.some(
        (element) => data?.[0].name === element.name && setIsAdded(true),
      );
    }
  };

  useEffect(() => {
    checkIsAdded();
  }, [data, portfolioCoins]);

  return (
    <div className={styles.ECwrap}>
      {isLoading && <LoadingCoinPage />}
      {error && (
        <div className={styles.errorWrap}>
          <NoRequests />
        </div>
      )}
      {!isLoading && data && (
        <div className={styles.exactCoinPageWrap} key={data?.[0].id}>
          <div className={styles.coinInfoWrap}>
            <div className={styles.leftInfoWrap}>
              <div className={styles.rankBlock}>
                Rank #
                {data?.[0].market_cap_rank ? data?.[0].market_cap_rank : 'N/A'}
              </div>
              <h1 className={styles.nameBlock}>
                <img
                  className={styles.exactCoinImage}
                  src={data?.[0].image}
                  alt="Coin Logo"
                />
                {data?.[0].name}
                {`(${data?.[0].symbol.toUpperCase()})`}
              </h1>
              <div className={styles.priceBlockWrapper}>
                <div className={styles.priceBlock}>
                  {data?.[0].current_price}
                  $
                </div>
                <div
                  className={
                    data?.[0].price_change_percentage_24h > 0
                      ? styles.dailyChangePercentagePositive
                      : styles.dailyChangePercentageNegative
                  }
                >
                  {data?.[0].price_change_percentage_24h > 0 && '+'}
                  {data?.[0].price_change_percentage_24h?.toFixed(2)}
                  %
                </div>
              </div>
              <div className={styles.tableBlock}>
                <div className={styles.tableRow}>
                  <div className={styles.tableRowText}>Market Cap:</div>
                  <div className={styles.tableRowInfo}>
                    {data?.[0].market_cap
                      ? data?.[0].market_cap?.toLocaleString()
                      : 'N/A'}
                    $
                  </div>
                </div>

                <div className={styles.tableRow}>
                  <div className={styles.tableRowText}>
                    Coin circulating supply:
                  </div>
                  <div className={styles.tableRowInfo}>
                    {data?.[0].circulating_supply
                      ? data?.[0].circulating_supply?.toLocaleString()
                      : 'N/A'}
                  </div>
                </div>

                <div className={styles.tableRow}>
                  <div className={styles.tableRowText}>
                    Market cap 24h change:
                  </div>
                  <div className={styles.tableRowInfo}>
                    {data?.[0].price_change_percentage_24h > 0 && '+'}
                    {data?.[0].market_cap_change_24h
                      ? data?.[0].market_cap_change_24h?.toLocaleString()
                      : 'N/A'}
                    $
                  </div>
                </div>

                <div className={styles.tableRow}>
                  <div className={styles.tableRowText}>Max supply:</div>
                  <div className={styles.tableRowInfo}>
                    {data?.[0].max_supply ? data?.[0].max_supply : '∞'}
                  </div>
                </div>

                <div className={styles.tableRow}>
                  <div className={styles.tableRowText}>Total volume:</div>
                  <div className={styles.tableRowInfo}>
                    {data?.[0].total_volume
                      ? data?.[0].total_volume?.toLocaleString()
                      : 'N/A'}
                    $
                  </div>
                </div>
              </div>
            </div>
            <ExactAddBlock
              coin={data?.[0]}
              isAdded={isAdded}
              key={data?.[0].id}
            />
          </div>
          <Charts coin={data?.[0]} key={data?.[0].id} />
        </div>
      )}
    </div>
  );
};

export default ExactCoinPage;
