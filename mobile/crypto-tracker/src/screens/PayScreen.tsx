import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Button } from '../components/Button';
import { Screen, SectionHeader } from '../components/Screen';
import { formatPrice } from '../features/market/format';
import { useAppStore } from '../store/useAppStore';
import { useTheme } from '../theme/useTheme';

const coins = [{ symbol: 'BTC', value: 0.00032, color: '#e1aa73' }, { symbol: 'ETH', value: 0.0078, color: '#a995e8' }, { symbol: 'USDC', value: 12.4, color: '#68c9b6' }];

export function PayScreen() {
  const { colors } = useTheme();
  const currency = useAppStore((state) => state.currency);
  const [selected, setSelected] = useState('BTC');
  const [paid, setPaid] = useState(false);
  const selectedCoin = coins.find((coin) => coin.symbol === selected) ?? coins[0]!;

  const confirm = async () => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setPaid(true);
  };

  return <Screen><SectionHeader eyebrow="Pay / demo mode" title="Оплата" /><LinearGradient colors={[`${colors.red}55`, `${colors.violet}28`]} style={styles.demoBanner}><View style={[styles.demoIcon, { backgroundColor: colors.red }]}><Text style={{ color: colors.white, fontSize: 18 }}>⌁</Text></View><View style={styles.demoCopy}><Text style={[styles.demoTitle, { color: colors.text }]}>Demo Mode</Text><Text style={[styles.demoText, { color: colors.muted }]}>Без реальных денег и blockchain-транзакций</Text></View></LinearGradient>{paid ? <View style={[styles.success, { backgroundColor: colors.surface, borderColor: colors.green }]}><Text style={[styles.successIcon, { color: colors.green }]}>✓</Text><Text style={[styles.successTitle, { color: colors.text }]}>Платёж подтверждён</Text><Text style={[styles.successText, { color: colors.muted }]}>Это демонстрационный сценарий. Средства не списывались.</Text><Button onPress={() => setPaid(false)} secondary>Новый платёж</Button></View> : <><View style={[styles.invoice, { backgroundColor: colors.surface, borderColor: colors.line }]}><Text style={[styles.overline, { color: colors.muted }]}>PAYMENT REQUEST / #0248</Text><Text style={[styles.invoiceValue, { color: colors.text }]}>$ 24.80</Text><Text style={[styles.invoiceText, { color: colors.muted }]}>Digital service / demo merchant</Text><View style={styles.invoiceRow}><Text style={[styles.overline, { color: colors.faint }]}>NETWORK</Text><Text style={[styles.overline, { color: colors.teal }]}>TESTNET</Text></View></View><Text style={[styles.overline, { color: colors.muted }]}>SELECT ASSET</Text><View style={styles.coinPicker}>{coins.map((coin) => <Pressable key={coin.symbol} onPress={() => setSelected(coin.symbol)} style={[styles.coinOption, { borderColor: selected === coin.symbol ? colors.red : colors.line, backgroundColor: selected === coin.symbol ? `${colors.red}18` : colors.surface }]}><View style={[styles.coinDot, { backgroundColor: coin.color }]} /><Text style={[styles.coinSymbol, { color: colors.text }]}>{coin.symbol}</Text><Text style={[styles.coinAmount, { color: colors.muted }]}>{coin.symbol === 'USDC' ? coin.value.toFixed(2) : coin.value}</Text></Pressable>)}</View><View style={[styles.qrMock, { backgroundColor: colors.surfaceRaised, borderColor: colors.line }]}><View style={styles.qrGrid}>{Array.from({ length: 25 }).map((_, index) => <View key={index} style={[styles.qrCell, { backgroundColor: index % 3 === 0 || index % 7 === 0 ? colors.text : 'transparent' }]} />)}</View><Text style={[styles.qrText, { color: colors.muted }]}>SCAN TO PAY / MOCK QR</Text></View><Button onPress={confirm}>Подтвердить {selectedCoin.symbol} · {formatPrice(24.8, currency)}</Button></>}</Screen>;
}

const styles = StyleSheet.create({
  demoBanner: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: 16, marginBottom: 22 },
  demoIcon: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center', borderRadius: 12 },
  demoCopy: { flex: 1, gap: 4 },
  demoTitle: { fontWeight: '700' },
  demoText: { fontSize: 11 },
  invoice: { padding: 18, borderWidth: 1, borderRadius: 18, marginBottom: 24 },
  overline: { fontFamily: 'monospace', fontSize: 10, letterSpacing: 1 },
  invoiceValue: { marginTop: 26, fontSize: 36, fontWeight: '700', letterSpacing: -1 },
  invoiceText: { marginTop: 8, fontSize: 12 },
  invoiceRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 28 },
  coinPicker: { gap: 8, marginTop: 12 },
  coinOption: { minHeight: 52, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 12, borderWidth: 1, borderRadius: 14 },
  coinDot: { width: 22, height: 22, borderRadius: 11 },
  coinSymbol: { flex: 1, fontWeight: '700' },
  coinAmount: { fontFamily: 'monospace', fontSize: 11 },
  qrMock: { minHeight: 170, alignItems: 'center', justifyContent: 'center', gap: 15, marginVertical: 24, borderWidth: 1, borderRadius: 18 },
  qrGrid: { width: 100, height: 100, flexDirection: 'row', flexWrap: 'wrap', padding: 4, backgroundColor: '#f1eeee' },
  qrCell: { width: '20%', height: '20%' },
  qrText: { fontFamily: 'monospace', fontSize: 9, letterSpacing: 1 },
  success: { alignItems: 'center', gap: 12, padding: 24, borderWidth: 1, borderRadius: 20 },
  successIcon: { fontSize: 52 },
  successTitle: { fontSize: 22, fontWeight: '700' },
  successText: { maxWidth: 260, textAlign: 'center', lineHeight: 20 },
});
