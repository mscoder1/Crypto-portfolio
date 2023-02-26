import { getPortfolioData } from './GetPortfolioData';

const testData = [
  {
    quantity: 1,
    buy_price: 1,
    current_price: 1,
  },
];

test('Проверка данных', () => {
  expect(getPortfolioData(testData)).toEqual({
    initialBalance: 1,
    currentBalance: 1,
  });
  expect(getPortfolioData(testData).currentBalance).toBeGreaterThan(0);
  expect(getPortfolioData(testData).initialBalance).toBeGreaterThan(0);
  expect(getPortfolioData(testData)).not.toBeUndefined();
});
