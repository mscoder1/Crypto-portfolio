import { memo, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { IFullCoinInfo } from '../../../Models/IFullCoinInfo';
import { portfolioAPI } from '../../../Services/PortfolioService';
import styles from './ExactPortfolioCoin.module.css';
import IconCloseCircle from '../../../Assets/PortfolioIcons/IconClose';
import IconCheckCircle from '../../../Assets/PortfolioIcons/IconCheck';

interface PortfolioCoinProps {
  coin: IFullCoinInfo;
  isManage: boolean;
}

const ExactPortfolioCoin = memo(({ coin, isManage }: PortfolioCoinProps) => {
  const [changeCoin] = portfolioAPI.useUpdateCoinsMutation();
  const [deleteCoin] = portfolioAPI.useDeleteCoinMutation();
  const [formData, setFormData] = useState({
    quantity: `${coin.quantity}`,
    buyPrice: `${coin.buy_price}`,
  });

  const checkQuantity = (coinQuantity: string) => {
    return +coinQuantity === 0
      ? deleteCoin(coin.id)
      : changeCoin({
        ...coin,
        quantity: +formData.quantity,
        buy_price: +formData.buyPrice,
      });
  };

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    checkQuantity(formData.quantity);
  };

  const checkProfit = useMemo(() => {
    return (coin: IFullCoinInfo) => {
      if (coin.quantity && coin.buy_price) {
        const profit = coin.quantity * coin.current_price - coin.quantity * coin.buy_price;
        return profit.toFixed(2);
      }
    };
  }, []);

  const checkTotal = () => {
    return coin.quantity && (coin.current_price * coin.quantity).toFixed(2);
  };

  return (
    <form
      className={styles.cardWrap}
      key={coin.name}
      onSubmit={handleSubmit}
    >
      <button
        type="button"
        onClick={() => deleteCoin(coin.id)}
        className={isManage ? styles.cardDelete : styles.cardDeleteNotActive}
      >
        <IconCloseCircle />
      </button>
      <Link
        to={`/coins/${coin.id}`}
        className={
          isManage ? styles.cardWrapTextOPName : styles.cardWrapTextName
        }
      >
        <img
          className={styles.cardWrapImage}
          src={coin.image}
          alt="Coin Logo"
          aria-label={coin.name}
        />
        <h3 className={styles.cardNameText}>
          {coin.name}
        </h3>
      </Link>
      <span className={isManage ? styles.cardWrapPriceTextOP : styles.cardWrapPriceText}>
        $
        {coin.current_price}
      </span>
      <fieldset
        className={styles.cardChangeValues}
        disabled={!isManage === true}
      >
        <div className={styles.cardWrapTextI} onClick={(e) => e.stopPropagation()}>
          <input
            name="buyPrice"
            className={styles.cardWrapTextInput}
            value={formData.buyPrice}
            onChange={handleInputChange}
            type="number"
            min="0"
            step="any"
            required
          />
        </div>
        <div className={styles.cardWrapTextI} onClick={(e) => e.stopPropagation()}>
          <input
            name="quantity"
            className={styles.cardWrapTextInput}
            value={formData.quantity}
            onChange={handleInputChange}
            type="number"
            min="0"
            step="any"
            required
          />
        </div>
      </fieldset>
      <div className={isManage ? styles.cardWrapTextOP : styles.cardWrapText}>
        {coin.price_change_percentage_24h?.toFixed(2)}
        %
      </div>
      <div className={isManage ? styles.cardWrapTextOP : styles.cardWrapText}>
        $
        {checkProfit(coin)}
      </div>
      <div className={isManage ? styles.cardWrapTextOP : styles.cardWrapText}>
        $
        {checkTotal()}
      </div>
      <button
        type="submit"
        className={
          isManage ? styles.cardApplyChangesRight : styles.cardApplyChangesRightNotActive
        }
      >
        <IconCheckCircle />
      </button>
    </form>
  );
});

export default ExactPortfolioCoin;
