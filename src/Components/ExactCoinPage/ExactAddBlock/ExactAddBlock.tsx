import { useState } from 'react';
import { IFullCoinInfo } from '../../../Models/IFullCoinInfo';
import { portfolioAPI } from '../../../Services/PortfolioService';
import styles from './ExactAddBlock.module.css';

interface ExactAddBlockProps {
  coin: IFullCoinInfo;
  isAdded: boolean;
}

const ExactAddBlock = ({ coin, isAdded }: ExactAddBlockProps) => {
  const [formData, setFormData] = useState({
    quantity: '',
    buyPrice: '',
  });

  const [addCoin] = portfolioAPI.useAddCoinToPortfolioMutation();

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addCoin({
      ...coin,
      quantity: +formData.quantity,
      buy_price: +formData.buyPrice,
    });
    setFormData({
      quantity: '',
      buyPrice: '',
    });
  };

  return (
    <form className={styles.ecaddToPort} onSubmit={handleSubmit}>
      <div className={styles.addBlckInfoTitle}>
        { /* eslint-disable-next-line react/jsx-one-expression-per-line */ }
        ADD {coin?.name?.toUpperCase()} TO PORTFOLIO
      </div>
      <fieldset className={styles.fieldsetaddblock} disabled={isAdded}>
        <div className={styles.enterInfo}>
          <label htmlFor="buyPrice" className={styles.EnterText}>
            Enter buy price:
            <input
              id="buyPrice"
              name="buyPrice"
              className={styles.EnterInput}
              value={formData.buyPrice}
              onChange={handleInputChange}
              placeholder="Buy Price..."
              type="number"
              min="0"
              step="any"
              required
            />
          </label>
        </div>
        <div className={styles.enterInfo}>
          <label htmlFor="quantity" className={styles.EnterText}>
            Enter quantity:
            <input
              id="quantity"
              name="quantity"
              className={styles.EnterInput}
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="Quantity..."
              type="number"
              min="0"
              step="any"
              required
            />
          </label>
        </div>
      </fieldset>
      <button
        type="submit"
        disabled={isAdded || !formData.quantity || !formData.buyPrice}
        className={styles.addCoinButton}
      >
        {isAdded ? 'Coin Added' : 'Add coin'}
      </button>
    </form>
  );
};

export default ExactAddBlock;
