import { useMemo, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Button } from '../components/Button';
import { CoinAvatar } from '../components/CoinAvatar';
import { Icon } from '../components/Icon';
import { Card, Screen, SectionHeader } from '../components/Screen';
import { fetchMarket } from '../features/market/api';
import { formatPrice } from '../features/market/format';
import { useAppStore } from '../store/useAppStore';
import { useTheme } from '../theme/useTheme';
import type { Holding } from '../types';

export function PortfolioScreen() {
  const { colors } = useTheme();
  const currency = useAppStore((state) => state.currency);
  const holdings = useAppStore((state) => state.holdings);
  const addHolding = useAppStore((state) => state.addHolding);
  const removeHolding = useAppStore((state) => state.removeHolding);
  const [modalOpen, setModalOpen] = useState(false);
  const [coinId, setCoinId] = useState('solana');
  const [amount, setAmount] = useState('2');
  const [buyPrice, setBuyPrice] = useState('160');
  const { data = [] } = useQuery({ queryKey: ['market', currency], queryFn: () => fetchMarket(currency), staleTime: 30_000 });

  const rows = useMemo(() => holdings.map((holding) => {
    const coin = data.find((item) => item.id === holding.coinId);
    const currentPrice = coin?.current_price ?? holding.buyPrice;
    return { ...holding, currentPrice, value: currentPrice * holding.amount, pnl: (currentPrice - holding.buyPrice) * holding.amount, image: coin?.image };
  }), [data, holdings]);
  const totalValue = rows.reduce((sum, row) => sum + row.value, 0);
  const totalPnl = rows.reduce((sum, row) => sum + row.pnl, 0);
  const totalInvested = rows.reduce((sum, row) => sum + row.buyPrice * row.amount, 0);
  const pnlPercent = totalInvested ? (totalPnl / totalInvested) * 100 : 0;

  const addAsset = () => {
    const coin = data.find((item) => item.id === coinId);
    if (!coin || !Number(amount)) return;
    addHolding({ coinId, symbol: coin.symbol, name: coin.name, amount: Number(amount), buyPrice: Number(buyPrice) || coin.current_price });
    setModalOpen(false);
  };

  return <Screen><View style={styles.header}><SectionHeader eyebrow="Portfolio / local" title="Портфель" /><Pressable onPress={() => setModalOpen(true)} style={[styles.add, { backgroundColor: colors.red }]} accessibilityLabel="Добавить актив"><Icon name="plus" color={colors.white} size={20} /></Pressable></View><Card><Text style={[styles.overline, { color: colors.muted }]}>TOTAL VALUE / {currency}</Text><Text style={[styles.total, { color: colors.text }]}>{formatPrice(totalValue, currency)}</Text><View style={styles.pnlRow}><Text style={[styles.pnl, { color: totalPnl >= 0 ? colors.green : colors.redBright }]}>{totalPnl >= 0 ? '+' : ''}{formatPrice(totalPnl, currency)} ({pnlPercent.toFixed(2)}%)</Text><Text style={[styles.muted, { color: colors.muted }]}>all time P&amp;L</Text></View><View style={styles.allocation}><View style={[styles.allocationBar, { backgroundColor: colors.red, flex: 0.6 }]} /><View style={[styles.allocationBar, { backgroundColor: colors.violet, flex: 0.28 }]} /><View style={[styles.allocationBar, { backgroundColor: colors.teal, flex: 0.12 }]} /></View><View style={styles.legend}><Text style={{ color: colors.muted }}>BTC 60%</Text><Text style={{ color: colors.muted }}>ETH 28%</Text><Text style={{ color: colors.muted }}>Other 12%</Text></View></Card><View style={styles.sectionTitle}><Text style={[styles.overline, { color: colors.muted }]}>YOUR ASSETS</Text><Text style={[styles.muted, { color: colors.muted }]}>{holdings.length} assets</Text></View>{rows.map((row) => <Pressable key={`${row.coinId}-${row.buyPrice}`} onLongPress={() => removeHolding(row.coinId)} style={[styles.assetRow, { borderBottomColor: colors.line }]}><CoinAvatar symbol={row.symbol} image={row.image} size={42} /><View style={styles.assetInfo}><Text style={[styles.assetName, { color: colors.text }]}>{row.name}</Text><Text style={[styles.muted, { color: colors.muted }]}>{row.amount} {row.symbol.toUpperCase()}</Text></View><View style={styles.assetValue}><Text style={[styles.assetName, { color: colors.text }]}>{formatPrice(row.value, currency)}</Text><Text style={[styles.muted, { color: row.pnl >= 0 ? colors.green : colors.redBright }]}>{row.pnl >= 0 ? '+' : ''}{formatPrice(row.pnl, currency)}</Text></View></Pressable>)}<Text style={[styles.hint, { color: colors.faint }]}>Зажми актив, чтобы удалить его из локального портфеля.</Text><Modal visible={modalOpen} transparent animationType="slide" onRequestClose={() => setModalOpen(false)}><View style={styles.modalBackdrop}><View style={[styles.modal, { backgroundColor: colors.surface, borderColor: colors.line }]}><View style={styles.modalTop}><Text style={[styles.modalTitle, { color: colors.text }]}>Добавить актив</Text><Pressable onPress={() => setModalOpen(false)}><Text style={[styles.close, { color: colors.muted }]}>×</Text></Pressable></View><TextInput value={coinId} onChangeText={setCoinId} placeholder="Coin ID, например solana" placeholderTextColor={colors.faint} style={[styles.input, { color: colors.text, borderColor: colors.line }]} /><TextInput value={amount} onChangeText={setAmount} keyboardType="decimal-pad" placeholder="Количество" placeholderTextColor={colors.faint} style={[styles.input, { color: colors.text, borderColor: colors.line }]} /><TextInput value={buyPrice} onChangeText={setBuyPrice} keyboardType="decimal-pad" placeholder="Цена покупки" placeholderTextColor={colors.faint} style={[styles.input, { color: colors.text, borderColor: colors.line }]} /><Button onPress={addAsset}>Добавить</Button></View></View></Modal></Screen>;
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  add: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20 },
  totalCard: { padding: 18, borderWidth: 1, borderRadius: 20 },
  overline: { fontFamily: 'monospace', fontSize: 10, letterSpacing: 1 },
  total: { marginTop: 14, fontSize: 38, fontWeight: '700', letterSpacing: -1.5 },
  pnlRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 9 },
  pnl: { fontFamily: 'monospace', fontSize: 12 },
  muted: { fontSize: 11 },
  allocation: { flexDirection: 'row', gap: 3, height: 8, marginTop: 25, overflow: 'hidden', borderRadius: 4 },
  allocationBar: { height: '100%' },
  legend: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 9 },
  sectionTitle: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 28, marginBottom: 8 },
  assetRow: { minHeight: 70, flexDirection: 'row', alignItems: 'center', gap: 11, borderBottomWidth: 1 },
  assetInfo: { flex: 1, gap: 4 },
  assetName: { fontSize: 14, fontWeight: '700' },
  assetValue: { alignItems: 'flex-end', gap: 4 },
  hint: { marginTop: 14, fontFamily: 'monospace', fontSize: 9, lineHeight: 15 },
  modalBackdrop: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.7)' },
  modal: { gap: 14, padding: 20, paddingBottom: 36, borderTopWidth: 1, borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  modalTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  modalTitle: { fontSize: 23, fontWeight: '700' },
  close: { fontSize: 30 },
  input: { minHeight: 48, paddingHorizontal: 14, borderWidth: 1, borderRadius: 12, fontSize: 14 },
});
