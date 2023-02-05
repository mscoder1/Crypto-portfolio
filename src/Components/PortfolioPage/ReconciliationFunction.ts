import axios from "axios";
import { IFullCoinInfo } from "../../Models/IFullCoinInfo";

export const Reconciliation = (AddedCoins: IFullCoinInfo[]) => {
  AddedCoins?.forEach(async (element) => {
    await axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${element.id}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      )
      .then(async (response) => {
        if (response.data[0].current_price !== element.current_price) {
          await axios.put(`http://localhost:4000/portfolio/${element.id}`, {
            ...response.data[0],
            quantity: element.quantity,
            buy_price: element.buy_price,
          });
        }
      });
  });
};
