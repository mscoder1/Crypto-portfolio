import styles from './TopInfoBlock.module.css';

const TopInfoBlock = () => {
  return (
    <div className={styles.sortBlockWrap}>
      <div className={styles.mrktRank}>#</div>
      <div className={styles.coinName}>Coin</div>
      <div className={styles.coinPrice}>Price</div>
      <div className={styles.coinDailyPriceChange}>24h</div>
      <div className={styles.coinDailyHigh}>24h high</div>
      <div className={styles.coinMarketCap}>Mrkt Cap</div>
    </div>
  );
};

export default TopInfoBlock;
