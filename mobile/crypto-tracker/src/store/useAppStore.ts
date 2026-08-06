import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Currency, Holding } from '../types';

type Theme = 'dark' | 'light';

type AppState = {
  theme: Theme;
  currency: Currency;
  watchlist: string[];
  holdings: Holding[];
  setTheme: (theme: Theme) => void;
  setCurrency: (currency: Currency) => void;
  toggleWatchlist: (coinId: string) => void;
  addHolding: (holding: Holding) => void;
  removeHolding: (coinId: string) => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'dark',
      currency: 'USD',
      watchlist: ['bitcoin', 'ethereum'],
      holdings: [
        { coinId: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', amount: 0.08, buyPrice: 42_500 },
        { coinId: 'ethereum', symbol: 'ETH', name: 'Ethereum', amount: 1.4, buyPrice: 2_180 },
      ],
      setTheme: (theme) => set({ theme }),
      setCurrency: (currency) => set({ currency }),
      toggleWatchlist: (coinId) => set((state) => ({
        watchlist: state.watchlist.includes(coinId)
          ? state.watchlist.filter((id) => id !== coinId)
          : [...state.watchlist, coinId],
      })),
      addHolding: (holding) => set((state) => ({ holdings: [...state.holdings, holding] })),
      removeHolding: (coinId) => set((state) => ({ holdings: state.holdings.filter((holding) => holding.coinId !== coinId) })),
    }),
    {
      name: 'crypto-tracker-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ theme: state.theme, currency: state.currency, watchlist: state.watchlist, holdings: state.holdings }),
    },
  ),
);
