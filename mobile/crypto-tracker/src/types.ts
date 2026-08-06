export type Currency = 'USD' | 'RUB';

export type Coin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency?: number;
  sparkline_in_7d?: { price: number[] };
  ath: number;
  atl: number;
  circulating_supply: number;
};

export type Holding = {
  coinId: string;
  symbol: string;
  name: string;
  amount: number;
  buyPrice: number;
};

export type RootStackParamList = {
  Tabs: undefined;
  CoinDetail: { coin: Coin };
};

export type TabParamList = {
  Market: undefined;
  Portfolio: undefined;
  Pay: undefined;
  Settings: undefined;
};
