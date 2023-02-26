import { IFullCoinInfo } from '../../../Models/IFullCoinInfo';

interface ITestData {
  quantity?: number;
  buy_price?: number;
  current_price: number;
}

export const getPortfolioData = (coins: IFullCoinInfo[] | ITestData[]) => {
  let initialBalance = 0;
  let currentBalance = 0;
  coins.forEach((element) => {
    if (element.buy_price && element.quantity) {
      initialBalance += element.buy_price * element.quantity;
      currentBalance += element.current_price * element.quantity;
    }
  });
  return {
    initialBalance,
    currentBalance,
  };
};
