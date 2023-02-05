import { memo, useState } from "react";
import { IFullCoinInfo } from "../../../Models/IFullCoinInfo";
import { portfolioAPI } from "../../../Services/PortfolioService";
import styles from "./ExactPortfolioCoin.module.css";
import { Link } from "react-router-dom";
import IconCloseCircle from '../../../Assets/PortfolioIcons/IconClose'
import IconCheckCircle from "../../../Assets/PortfolioIcons/IconCheck";


interface PortfolioCoinProps {
  coin: IFullCoinInfo;
  isManage: boolean;
}

const ExactPortfolioCoin = memo(({ coin, isManage }: PortfolioCoinProps) => {
  const [changeCoin] = portfolioAPI.useUpdateCoinsMutation();
  const [coinQuantity, setCoinQuantity] = useState(`${coin.quantity}`);
  const [coinBuyPrice, setCoinBuyPrice] = useState(`${coin.buy_price}`);
  const [deleteCoin] = portfolioAPI.useDeleteCoinMutation();

  const onChangeQuantity = (
    e: React.FormEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>
  ) => {
    setCoinQuantity(e.currentTarget.value);
  };

  const onChangeBuyPrice = (e: React.FormEvent<HTMLInputElement>) => {
    setCoinBuyPrice(e.currentTarget.value);
  };

  const isEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.code === "Enter" && checkQuantity(coinQuantity);
  };

  const checkQuantity = (coinQuantity: string) => {
    +coinQuantity === 0
      ? deleteCoin(coin.id)
      : changeCoin({
          ...coin,
          quantity: +coinQuantity,
          buy_price: +coinBuyPrice,
        });
  };

  const checkProfit = (coin: IFullCoinInfo) => {
    if (coin.quantity && coin.buy_price) {
      const profit =
        coin.quantity * coin.current_price - coin.quantity * coin.buy_price;
      return profit.toFixed(2);
    }
  };

  const checkTotal = () => {
    return coin.quantity && (coin.current_price * coin.quantity).toFixed(2);
  };

  return (
    <div className={styles.cardWrap} key={coin.name}>
      <div
        onClick={() => deleteCoin(coin.id)}
        className={isManage ? styles.cardDelete : styles.cardDeleteNotActive}
      >
        <IconCloseCircle />
      </div>
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
        />
        {coin.name}
      </Link>
      <div className={isManage ? styles.cardWrapTextOP : styles.cardWrapText}>
        {coin.current_price}
      </div>
      <div className={styles.cardWrapText} onClick={(e) => e.stopPropagation()}>
        <input
          type="text"
          className={styles.cardWrapTextInput}
          value={coinBuyPrice}
          onKeyDown={(e) => isEnter(e)}
          onChange={(e) => onChangeBuyPrice(e)}
          disabled={!isManage === true}
        />
      </div>
      <div className={styles.cardWrapText} onClick={(e) => e.stopPropagation()}>
        <input
          type="text"
          className={styles.cardWrapTextInput}
          value={coinQuantity}
          onKeyDown={(e) => isEnter(e)}
          onChange={(e) => onChangeQuantity(e)}
          disabled={!isManage === true}
        />
      </div>
      <div className={isManage ? styles.cardWrapTextOP : styles.cardWrapText}>
        {coin.price_change_percentage_24h?.toFixed(2)} %
      </div>
      <div className={isManage ? styles.cardWrapTextOP : styles.cardWrapText}>
        {checkProfit(coin)} $
      </div>
      <div className={isManage ? styles.cardWrapTextOP : styles.cardWrapText}>
        $ {checkTotal()}
      </div>
      <div
        onClick={() => checkQuantity(coinQuantity)}
        className={
          isManage ? styles.cardApplyChangesRight : styles.buttonInactive
        }
      >
        <IconCheckCircle />
      </div>
    </div>
  );
});

export default ExactPortfolioCoin;
