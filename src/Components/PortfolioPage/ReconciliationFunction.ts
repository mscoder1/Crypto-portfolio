import axios from 'axios';
import { IFullCoinInfo } from '../../Models/IFullCoinInfo';

export const Reconciliation = (AddedCoins: IFullCoinInfo[]) => {
  AddedCoins?.forEach(async (element) => {
    try {
      // Получаем данные о монете из API Coingecko
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${element.id}&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
      );

      // Сравниваем цену монеты в портфеле с ценой, полученной из API
      if (response.data[0].current_price !== element.current_price) {
        // Если цены отличаются, обновляем данные о монете в базе данных
        await axios.put(`http://localhost:4000/portfolio/${element.id}`, {
          ...response.data[0],
          quantity: element.quantity,
          buy_price: element.buy_price,
        });
      }
    } catch (error) {
      // Обрабатываем ошибки, которые могут возникнуть при выполнении запроса к API
      // или обновлении данных
      // eslint-disable-next-line no-console
      console.log(`Error occurred: ${error}`);
    }
  });
};
