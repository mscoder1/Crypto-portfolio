import { useState } from 'react';
import { IFullCoinInfo } from '../../../Models/IFullCoinInfo';
import { portfolioAPI } from '../../../Services/PortfolioService';
import styles from './ExactAddBlock.module.css';
import { checkValidData } from './ValidString';

interface ExactAddBlockProps {
  coin: IFullCoinInfo;
  isAdded: boolean;
}

const ExactAddBlock = ({ coin, isAdded }: ExactAddBlockProps) => {
  const [quantity, setQuantity] = useState('');
  const [buyPrice, setBuyPrice] = useState('');

  const [addCoin] = portfolioAPI.useAddCoinToPortfolioMutation();

  const addCoinToPortfolio = (coin: IFullCoinInfo) => {
    addCoin(coin);
  };

  const onChangeQuantity = (e: React.FormEvent<HTMLInputElement>) => {
    setQuantity(e.currentTarget.value);
  };

  const onChangeBuyPrice = (e: React.FormEvent<HTMLInputElement>) => {
    setBuyPrice(e.currentTarget.value);
  };

  return (
    <form className={styles.ecaddToPort}>
      <div className={styles.addBlckInfoTitle}>
        ADD
        {coin?.name?.toUpperCase()}
        TO PORTFOLIO
      </div>
      <fieldset
        className={styles.fieldsetaddblock}
        disabled={isAdded === true}
      >
        <div className={styles.enterInfo}>
          <label htmlFor="BuyPrice" className={styles.EnterText}>
            Enter buy price:
            <input
              id="BuyPrice"
              className={styles.EnterInput}
              value={buyPrice}
              onChange={(e) => onChangeBuyPrice(e)}
              placeholder="Buy Price..."
            />
          </label>
        </div>
        <div className={styles.enterInfo}>
          <label htmlFor="Quantity" className={styles.EnterText}>
            Enter quantity:
            <input
              id="Quantity"
              className={styles.EnterInput}
              value={quantity}
              onChange={(e) => onChangeQuantity(e)}
              placeholder="Quantity..."
            />
          </label>
        </div>
      </fieldset>
      <button
        type="button"
        disabled={
          isAdded === true
          || quantity === ''
          || buyPrice === ''
          || checkValidData(quantity, buyPrice)
        }
        className={styles.addCoinButton}
        onClick={() => {
          addCoinToPortfolio({
            ...coin,
            quantity: +quantity,
            buy_price: +buyPrice,
          });
          setQuantity('');
          setBuyPrice('');
        }}
      >
        {isAdded ? 'Coin Added' : 'Add coin'}
      </button>
    </form>
  );
};

export default ExactAddBlock;
