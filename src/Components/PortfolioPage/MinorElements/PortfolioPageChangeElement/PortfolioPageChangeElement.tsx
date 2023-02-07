import { memo } from 'react';
import styles from './PortfolioPageChangeElement.module.css';

interface PortfolioPageChangeElementProps {
  balance: number;
  TotalProfitLoss: number;
  PNLCurrency: number;
}

export const PortfolioPageChangeElement = memo(
  ({
    balance,
    TotalProfitLoss,
    PNLCurrency,
  }: PortfolioPageChangeElementProps) => {
    return (
      <div className={styles.PortfolioPageChangeBlock}>
        <div className={styles.PortfolioPageChangeElement}>
          <div className={styles.PortfolioPageChangeElementText}>Balance</div>
          <div className={styles.PortfolioPageChangeElementText}>
            {balance?.toFixed(2)}
            $
          </div>
        </div>
        <div className={styles.PortfolioPageChangeElement}>
          <div className={styles.PortfolioPageChangeElementText}>PNL %</div>
          <div className={styles.PortfolioPageChangeElementText}>
            {Number.isNaN(TotalProfitLoss) ? 0 : TotalProfitLoss?.toFixed(2)}
            %
          </div>
        </div>
        <div className={styles.PortfolioPageChangeElement}>
          <div className={styles.PortfolioPageChangeElementText}>PNL $</div>
          <div className={styles.PortfolioPageChangeElementText}>
            {PNLCurrency?.toFixed(2)}
            $
          </div>
        </div>
      </div>
    );
  },
);
