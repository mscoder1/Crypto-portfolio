export const checkValidData = (quantity: string, buyPrice: string) => {
  const regex = /(?!(?<!^),|(?<!^)\.)[+\D]/g;
  return regex.test(quantity) || regex.test(buyPrice);
};
