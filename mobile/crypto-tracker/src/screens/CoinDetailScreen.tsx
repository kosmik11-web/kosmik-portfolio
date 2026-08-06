import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Svg, { Line, Polyline } from 'react-native-svg';
import { Button } from '../components/Button';
import { CoinAvatar } from '../components/CoinAvatar';
import { Icon } from '../components/Icon';
import { Screen } from '../components/Screen';
import { fetchCoinChart } from '../features/market/api';
import { formatCompact, formatPercent, formatPrice } from '../features/market/format';
import { useAppStore } from '../store/useAppStore';
import { useTheme } from '../theme/useTheme';
import type { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'CoinDetail'>;
const intervals = ['1Ч', '1Д', '1Н', '1М', '1Г', 'Все'];

export function CoinDetailScreen({ route, navigation }: Props) {
  const { coin } = route.params;
  const { colors } = useTheme();
  const currency = useAppStore((state) => state.currency);
  const watchlist = useAppStore((state) => state.watchlist);
  const toggleWatchlist = useAppStore((state) => state.toggleWatchlist);
  const addHolding = useAppStore((state) => state.addHolding);
  const [interval, setInterval] = useState('1М');
  const positive = coin.price_change_percentage_24h >= 0;
  const daysByInterval: Record<string, number> = { '1Ч': 1, '1Д': 1, '1Н': 7, '1М': 30, '1Г': 365, Все: 3650 };
  const chartQuery = useQuery({ queryKey: ['chart', coin.id, currency, interval], queryFn: () => fetchCoinChart(coin.id, currency, daysByInterval[interval] ?? 30), staleTime: 60_000, retry: 1 });
  const chartPoints = chartQuery.data ?? coin.sparkline_in_7d?.price ?? [1, 2, 1.6, 2.8, 2.4, 3.3, 3.1, 4];

  const saveToPortfolio = () => {
    addHolding({ coinId: coin.id, symbol: coin.symbol, name: coin.name, amount: 0, buyPrice: coin.current_price });
    Alert.alert('Добавлено', `${coin.name} добавлен в портфель`);
  };

  return <Screen><View style={styles.top}><Pressable onPress={() => navigation.goBack()} style={[styles.back, { borderColor: colors.line }]} accessibilityLabel="Назад"><Icon name="back" color={colors.text} size={20} /></Pressable><Pressable onPress={() => toggleWatchlist(coin.id)} accessibilityLabel="Добавить в избранное"><Icon name="star" color={watchlist.includes(coin.id) ? colors.redBright : colors.muted} size={23} /></Pressable></View><View style={styles.coinHeading}><CoinAvatar symbol={coin.symbol} image={coin.image} size={58} /><View><Text style={[styles.name, { color: colors.text }]}>{coin.name}</Text><Text style={[styles.symbol, { color: colors.muted }]}>{coin.symbol.toUpperCase()} / {currency}</Text></View></View><Text style={[styles.price, { color: colors.text }]}>{formatPrice(coin.current_price, currency)}</Text><Text style={[styles.change, { color: positive ? colors.green : colors.redBright }]}>{formatPercent(coin.price_change_percentage_24h)} today</Text><View style={[styles.chartCard, { backgroundColor: colors.surface, borderColor: colors.line }]}><View style={styles.chartHeader}><Text style={[styles.chartLabel, { color: colors.muted }]}>PRICE PERFORMANCE / {interval}</Text><Text style={[styles.chartValue, { color: positive ? colors.green : colors.redBright }]}>{chartQuery.isFetching ? 'SYNCING' : `${positive ? '↗' : '↘'} ${formatPercent(coin.price_change_percentage_24h)}`}</Text></View><PriceChart values={chartPoints} color={positive ? colors.green : colors.redBright} /></View><View style={styles.intervals}>{intervals.map((item) => <Pressable key={item} onPress={() => setInterval(item)} style={[styles.interval, { backgroundColor: interval === item ? colors.red : colors.surfaceRaised }]}><Text style={[styles.intervalText, { color: interval === item ? colors.white : colors.muted }]}>{item}</Text></Pressable>)}</View><View style={styles.metrics}>{[['Market cap', formatCompact(coin.market_cap, currency)], ['Volume 24h', formatCompact(coin.total_volume, currency)], ['ATH', formatPrice(coin.ath, currency)], ['ATL', formatPrice(coin.atl, currency)], ['Supply', new Intl.NumberFormat('en-US', { notation: 'compact' }).format(coin.circulating_supply)]].map(([label, value]) => <View key={label} style={[styles.metric, { borderColor: colors.line }]}><Text style={[styles.metricLabel, { color: colors.muted }]}>{label}</Text><Text style={[styles.metricValue, { color: colors.text }]}>{value}</Text></View>)}</View><Button onPress={saveToPortfolio}>Добавить в портфель</Button></Screen>;
}

function PriceChart({ values, color }: { values: number[]; color: string }) {
  const width = 320;
  const height = 150;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const points = values.map((value, index) => `${(index / Math.max(values.length - 1, 1)) * width},${height - ((value - min) / range) * 120 - 10}`).join(' ');
  return <Svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}><Line x1="0" y1="35" x2={width} y2="35" stroke="rgba(232,230,230,0.08)" /><Line x1="0" y1="85" x2={width} y2="85" stroke="rgba(232,230,230,0.08)" /><Polyline points={points} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></Svg>;
}

const styles = StyleSheet.create({
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  back: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 19 },
  star: { fontSize: 28 },
  coinHeading: { flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 30 },
  name: { fontSize: 22, fontWeight: '700' },
  symbol: { marginTop: 5, fontFamily: 'monospace', fontSize: 11 },
  price: { marginTop: 26, fontSize: 42, fontWeight: '700', letterSpacing: -2 },
  change: { marginTop: 8, fontFamily: 'monospace', fontSize: 12 },
  chartCard: { marginTop: 24, padding: 14, borderWidth: 1, borderRadius: 18 },
  chartHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  chartLabel: { fontFamily: 'monospace', fontSize: 10, letterSpacing: 1 },
  chartValue: { fontFamily: 'monospace', fontSize: 10 },
  intervals: { flexDirection: 'row', justifyContent: 'space-between', gap: 6, marginTop: 12 },
  interval: { flex: 1, alignItems: 'center', paddingVertical: 8, borderRadius: 10 },
  intervalText: { fontFamily: 'monospace', fontSize: 10 },
  metrics: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 22, marginBottom: 22 },
  metric: { width: '48%', minHeight: 70, justifyContent: 'space-between', padding: 12, borderWidth: 1, borderRadius: 14 },
  metricLabel: { fontFamily: 'monospace', fontSize: 9, textTransform: 'uppercase' },
  metricValue: { fontSize: 14, fontWeight: '700' },
});
