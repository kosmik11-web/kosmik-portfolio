import type { Coin, Currency } from '../../types';

const endpoint = 'https://api.coingecko.com/api/v3/coins/markets';
const fallbackRubRate = 92.5;

const fallbackCoins: Coin[] = [
  { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin', image: '', current_price: 68_420, market_cap: 1_350_000_000_000, total_volume: 28_400_000_000, price_change_percentage_24h: 2.8, price_change_percentage_7d_in_currency: 5.4, sparkline_in_7d: { price: [62000, 63800, 63200, 65100, 64700, 66800, 68420] }, ath: 73_737, atl: 67.81, circulating_supply: 19_700_000 },
  { id: 'ethereum', symbol: 'eth', name: 'Ethereum', image: '', current_price: 3_480, market_cap: 418_000_000_000, total_volume: 14_300_000_000, price_change_percentage_24h: 1.7, price_change_percentage_7d_in_currency: 3.2, sparkline_in_7d: { price: [3180, 3250, 3210, 3390, 3350, 3440, 3480] }, ath: 4_878, atl: 0.43, circulating_supply: 120_300_000 },
  { id: 'solana', symbol: 'sol', name: 'Solana', image: '', current_price: 182.4, market_cap: 85_000_000_000, total_volume: 3_900_000_000, price_change_percentage_24h: -0.9, price_change_percentage_7d_in_currency: 8.1, sparkline_in_7d: { price: [160, 168, 164, 173, 178, 176, 182] }, ath: 293.31, atl: 0.5, circulating_supply: 465_000_000 },
  { id: 'cardano', symbol: 'ada', name: 'Cardano', image: '', current_price: 0.61, market_cap: 21_700_000_000, total_volume: 340_000_000, price_change_percentage_24h: 3.6, price_change_percentage_7d_in_currency: -1.2, sparkline_in_7d: { price: [0.57, 0.59, 0.58, 0.61, 0.6, 0.59, 0.61] }, ath: 3.09, atl: 0.019, circulating_supply: 35_500_000_000 },
];

function fallbackForCurrency(currency: Currency) {
  if (currency === 'USD') return fallbackCoins;
  return fallbackCoins.map((coin) => ({
    ...coin,
    current_price: coin.current_price * fallbackRubRate,
    market_cap: coin.market_cap * fallbackRubRate,
    total_volume: coin.total_volume * fallbackRubRate,
    ath: coin.ath * fallbackRubRate,
    atl: coin.atl * fallbackRubRate,
    sparkline_in_7d: coin.sparkline_in_7d ? { price: coin.sparkline_in_7d.price.map((value) => value * fallbackRubRate) } : undefined,
  }));
}

export async function fetchMarket(currency: Currency): Promise<Coin[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);
  try {
    const response = await fetch(`${endpoint}?vs_currency=${currency.toLowerCase()}&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=24h,7d`, { signal: controller.signal });
    if (!response.ok) throw new Error(`CoinGecko HTTP ${response.status}`);
    return await response.json() as Coin[];
  } catch {
    return fallbackForCurrency(currency);
  } finally {
    clearTimeout(timeout);
  }
}

export async function fetchCoinChart(coinId: string, currency: Currency, days: number): Promise<number[]> {
  const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.toLowerCase()}&days=${days}`);
  if (!response.ok) throw new Error(`Chart HTTP ${response.status}`);
  const data = await response.json() as { prices: [number, number][] };
  return data.prices.map((point) => point[1]);
}
