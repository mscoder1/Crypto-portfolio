export const checkValidData = (quantity: string, buyPrice: string) => {
  const Alphabet = /(?!(?<!^),|(?<!^)\.)[+\D]/g;
  return Alphabet.test(quantity) || Alphabet.test(buyPrice);
};
