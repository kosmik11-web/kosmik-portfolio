import { Image, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/useTheme';

export function CoinAvatar({ symbol, image, size = 42 }: { symbol: string; image?: string; size?: number }) {
  const { colors } = useTheme();
  return image ? <Image source={{ uri: image }} style={{ width: size, height: size, borderRadius: size / 2 }} /> : <View style={[styles.fallback, { width: size, height: size, borderRadius: size / 2, backgroundColor: `${colors.red}25`, borderColor: colors.lineStrong }]}><Text style={[styles.text, { color: colors.redBright, fontSize: size * 0.35 }]}>{symbol.slice(0, 1).toUpperCase()}</Text></View>;
}

const styles = StyleSheet.create({
  fallback: { alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  text: { fontWeight: '700' },
});
