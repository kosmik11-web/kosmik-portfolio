import { useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, RefreshControl, StyleSheet, Text, TextInput, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { CoinAvatar } from '../components/CoinAvatar';
import { Screen, SectionHeader } from '../components/Screen';
import { Sparkline } from '../components/Sparkline';
import { fetchMarket } from '../features/market/api';
import { formatCompact, formatPercent, formatPrice } from '../features/market/format';
import { useAppStore } from '../store/useAppStore';
import { useTheme } from '../theme/useTheme';
import type { Coin, RootStackParamList } from '../types';

type SortMode = 'market_cap' | 'price' | 'change';

export function MarketScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors } = useTheme();
  const currency = useAppStore((state) => state.currency);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortMode>('market_cap');
  const { data = [], isLoading, isFetching, refetch } = useQuery({ queryKey: ['market', currency], queryFn: () => fetchMarket(currency), staleTime: 30_000, refetchInterval: 60_000 });

  const coins = useMemo(() => data.filter((coin) => `${coin.name} ${coin.symbol}`.toLowerCase().includes(search.toLowerCase())).sort((a, b) => sort === 'price' ? b.current_price - a.current_price : sort === 'change' ? b.price_change_percentage_24h - a.price_change_percentage_24h : b.market_cap - a.market_cap), [data, search, sort]);

  return <Screen scroll={false}><View style={styles.header}><SectionHeader eyebrow="Market / live data" title="Рынок" /><View style={styles.currencyBadge}><Text style={[styles.currencyText, { color: colors.teal }]}>● {currency}</Text><Text style={[styles.updated, { color: colors.faint }]}>{isFetching ? 'updating' : 'updated'}</Text></View></View><TextInput value={search} onChangeText={setSearch} placeholder="Найти актив" placeholderTextColor={colors.faint} style={[styles.search, { borderColor: colors.line, backgroundColor: colors.surface, color: colors.text }]} accessibilityLabel="Поиск криптовалюты" /><View style={styles.sortRow}>{[['market_cap', 'Капитализация'], ['price', 'Цена'], ['change', 'Рост']].map(([value, label]) => <Pressable key={value} onPress={() => setSort(value as SortMode)} style={[styles.sortButton, { borderColor: sort === value ? colors.red : colors.line, backgroundColor: sort === value ? `${colors.red}18` : colors.surface }]}><Text style={[styles.sortText, { color: sort === value ? colors.redBright : colors.muted }]}>{label}</Text></Pressable>)}</View>{isLoading ? <LoadingState colors={colors} /> : <FlatList data={coins} keyExtractor={(coin) => coin.id} contentContainerStyle={styles.list} refreshControl={<RefreshControl refreshing={isFetching} onRefresh={() => void refetch()} tintColor={colors.red} />} renderItem={({ item, index }) => <CoinRow coin={item} rank={index + 1} currency={currency} colors={colors} onPress={() => navigation.navigate('CoinDetail', { coin: item })} />} ListEmptyComponent={<Text style={[styles.empty, { color: colors.muted }]}>Ничего не найдено</Text>} />}</Screen>;
}

function CoinRow({ coin, rank, currency, colors, onPress }: { coin: Coin; rank: number; currency: 'USD' | 'RUB'; colors: ReturnType<typeof useTheme>['colors']; onPress: () => void }) {
  const positive = coin.price_change_percentage_24h >= 0;
  return <Pressable onPress={onPress} style={({ pressed }) => [styles.row, { borderBottomColor: colors.line, backgroundColor: colors.ink }, pressed && styles.rowPressed]}><Text style={[styles.rank, { color: colors.faint }]}>{String(rank).padStart(2, '0')}</Text><CoinAvatar symbol={coin.symbol} image={coin.image} size={38} /><View style={styles.coinInfo}><Text style={[styles.name, { color: colors.text }]}>{coin.name}</Text><Text style={[styles.symbol, { color: colors.muted }]}>{coin.symbol.toUpperCase()} · {formatCompact(coin.market_cap, currency)}</Text></View><View style={styles.coinPrice}><Text style={[styles.price, { color: colors.text }]}>{formatPrice(coin.current_price, currency)}</Text><Text style={[styles.change, { color: positive ? colors.green : colors.redBright }]}>{formatPercent(coin.price_change_percentage_24h)}</Text></View><Sparkline values={coin.sparkline_in_7d?.price} color={positive ? colors.green : colors.redBright} /></Pressable>;
}

function LoadingState({ colors }: { colors: ReturnType<typeof useTheme>['colors'] }) {
  return <View style={styles.loading}>{[1, 2, 3, 4, 5].map((item) => <View key={item} style={[styles.skeleton, { backgroundColor: colors.surface }]}><ActivityIndicator color={colors.red} /></View>)}</View>;
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  currencyBadge: { alignItems: 'flex-end', gap: 4, paddingTop: 5 },
  currencyText: { fontSize: 11, fontWeight: '700', letterSpacing: 1 },
  updated: { fontFamily: 'monospace', fontSize: 9, textTransform: 'uppercase' },
  search: { minHeight: 48, paddingHorizontal: 16, borderWidth: 1, borderRadius: 14, fontSize: 15 },
  sortRow: { flexDirection: 'row', gap: 8, marginTop: 12 },
  sortButton: { paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderRadius: 20 },
  sortText: { fontSize: 11, fontWeight: '600' },
  list: { paddingTop: 14, paddingBottom: 32 },
  row: { minHeight: 74, flexDirection: 'row', alignItems: 'center', gap: 10, borderBottomWidth: 1 },
  rowPressed: { opacity: 0.65 },
  rank: { width: 20, fontFamily: 'monospace', fontSize: 10 },
  coinInfo: { flex: 1, gap: 5 },
  name: { fontSize: 14, fontWeight: '700' },
  symbol: { fontFamily: 'monospace', fontSize: 10 },
  coinPrice: { alignItems: 'flex-end', gap: 4 },
  price: { fontSize: 13, fontWeight: '600' },
  change: { fontFamily: 'monospace', fontSize: 10 },
  loading: { gap: 10, paddingTop: 14 },
  skeleton: { height: 74, alignItems: 'center', justifyContent: 'center', borderRadius: 12 },
  empty: { paddingTop: 40, textAlign: 'center' },
});
