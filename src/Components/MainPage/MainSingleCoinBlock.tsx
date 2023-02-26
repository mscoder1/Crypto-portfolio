import { memo } from 'react';
import { Link } from 'react-router-dom';
import { IFullCoinInfo } from '../../Models/IFullCoinInfo';
import styles from './SingleCoinBlock.module.css';

interface SingleCoinBlockProps {
  coin: IFullCoinInfo;
  currency: string;
}

const MainSingleCoinBLock = memo(({ coin, currency }: SingleCoinBlockProps) => {
  return (
    <Link to={`/coins/${coin.id}`} className={styles.linkWrap}>
      <div className={styles.mrktRank}>
        <div className={styles.techWrapRank}>{coin.market_cap_rank}</div>
      </div>
      <div className={styles.coinName}>
        <img className={styles.singleCoinImage} src={coin.image} alt="coinLogo" />
        {coin.name}
      </div>
      <div className={styles.coinPrice}>
        {coin.current_price === null ? '0' : coin.current_price?.toFixed(2)}
        {' '}
        {currency}
      </div>
      <div
        className={
          coin.price_change_percentage_24h > 0
            ? styles.coinDailyPriceChange
            : styles.coinDailyPriceChangeNegative
        }
      >
        {coin.price_change_percentage_24h > 0 && '+'}
        {coin.price_change_percentage_24h === null
          ? '0 %'
          : `${coin.price_change_percentage_24h?.toFixed(2)}%`}
      </div>
      <div className={styles.coinDailyHigh}>
        {coin.high_24h === null ? '0' : coin.high_24h}
      </div>
      <div className={styles.coinMarketCap}>
        {coin.market_cap === null ? '0' : coin.market_cap?.toLocaleString()}
      </div>
    </Link>
  );
});

export default MainSingleCoinBLock;
