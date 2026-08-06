import type { Currency } from '../../types';

export function formatPrice(value: number, currency: Currency) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: value < 1 ? 4 : 2 }).format(value);
}

export function formatCompact(value: number, currency = 'USD') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, notation: 'compact', maximumFractionDigits: 1 }).format(value);
}

export function formatPercent(value?: number) {
  if (value === undefined) return '—';
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
}
