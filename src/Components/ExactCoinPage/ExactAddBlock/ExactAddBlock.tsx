import { useState } from "react";
import { IFullCoinInfo } from "../../../Models/IFullCoinInfo";
import { portfolioAPI } from "../../../Services/PortfolioService";
import styles from "./ExactAddBlock.module.css";
import { checkValidData } from "./ValidString";

interface exactAddBlockProps {
  coin: IFullCoinInfo;
  isAdded: boolean;
}

const ExactAddBlock = (props: exactAddBlockProps) => {
  const [quantity, setQuantity] = useState("");
  const [buyPrice, setBuyPrice] = useState("");

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
        ADD {props.coin?.name?.toUpperCase()} TO PORTFOLIO
      </div>
      <fieldset
        className={styles.fieldsetaddblock}
        disabled={props.isAdded === true}
      >
        <div className={styles.enterInfo}>
          <label className={styles.EnterText}>Enter buy price: </label>
          <input
            className={styles.EnterInput}
            value={buyPrice}
            onChange={(e) => onChangeBuyPrice(e)}
            placeholder="Buy Price..."
          />
        </div>
        <div className={styles.enterInfo}>
          <label className={styles.EnterText}>Enter quantity:</label>
          <input
            className={styles.EnterInput}
            value={quantity}
            onChange={(e) => onChangeQuantity(e)}
            placeholder="Quantity..."
          />
        </div>
      </fieldset>
      <button
        disabled={
          props.isAdded === true ||
          quantity === "" ||
          buyPrice === "" ||
          checkValidData(quantity, buyPrice)
        }
        className={styles.addCoinButton}
        onClick={(e) => {
          addCoinToPortfolio({
            ...props.coin,
            quantity: +quantity,
            buy_price: +buyPrice,
          });
          setQuantity("");
          setBuyPrice("");
        }}
      >
        {props.isAdded ? "Coin Added" : "Add coin"}
      </button>
    </form>
  );
};

export default ExactAddBlock;
