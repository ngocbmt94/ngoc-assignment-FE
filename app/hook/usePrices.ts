interface Prices {
  [currency: string]: number;
}

export function usePrices() {
  return {
    prices: {
      USD: 10,
      EUR: 11,
    } as Prices,
  };
}
