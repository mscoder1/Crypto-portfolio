import styles from './TopInfoBlock.module.css';

export const TopInfoBlock = () => {
  return (
    <div className={styles.topInfoBlock}>
      <div className={styles.topInfoBlockTextCoin}>Coin</div>
      <div className={styles.topInfoBlockText}>Current price</div>
      <div className={styles.topInfoBlockText}>Buy price</div>
      <div className={styles.topInfoBlockText}>Quantity</div>
      <div className={styles.topInfoBlockText}>Daily change</div>
      <div className={styles.topInfoBlockText}>PNL</div>
      <div className={styles.topInfoBlockText}>Total</div>
    </div>
  );
};
