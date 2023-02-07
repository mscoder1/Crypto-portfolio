export const checkValidData = (quantity: string, buyPrice: string) => {
  const String = /(?!(?<!^),|(?<!^)\.)[+\D]/g;
  return String.test(quantity) || String.test(buyPrice);
};
