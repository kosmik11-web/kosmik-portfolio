import type { PropsWithChildren } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';

type Props = PropsWithChildren<{ scroll?: boolean }>;

export function Screen({ children, scroll = true }: Props) {
  const { colors: themeColors } = useTheme();
  const content = scroll ? <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>{children}</ScrollView> : children;
  return <LinearGradient colors={[themeColors.ink, `${themeColors.red}0d`, themeColors.ink]} style={styles.background}><SafeAreaView style={styles.safe}>{content}</SafeAreaView></LinearGradient>;
}

export function Card({ children, style }: Props & { style?: object }) {
  const { colors: themeColors, theme } = useTheme();
  return <BlurView intensity={28} tint={theme === 'dark' ? 'dark' : 'light'} style={[styles.card, { borderColor: themeColors.line }, style]}><LinearGradient colors={[`${themeColors.surface}e8`, `${themeColors.surfaceRaised}c7`]} style={styles.cardGradient}>{children}</LinearGradient></BlurView>;
}

export function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  const { colors: themeColors } = useTheme();
  return <View style={styles.header}><View><View style={styles.eyebrowRow}><View style={[styles.dot, { backgroundColor: themeColors.red }]} /><TextLabel color={themeColors.muted}>{eyebrow}</TextLabel></View><TextTitle color={themeColors.text}>{title}</TextTitle></View></View>;
}

export function TextLabel({ children, color }: Props & { color: string }) {
  return <View><Text style={[styles.label, { color }]}>{children}</Text></View>;
}

export function TextTitle({ children, color }: Props & { color: string }) {
  return <Text style={[styles.title, { color }]}>{children}</Text>;
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  safe: { flex: 1 },
  content: { padding: spacing.md, paddingBottom: spacing.xxl * 2 },
  card: { overflow: 'hidden', borderWidth: 1, borderRadius: 18 },
  cardGradient: { padding: spacing.md },
  header: { marginBottom: spacing.lg },
  eyebrowRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10 },
  dot: { width: 6, height: 6, borderRadius: 3 },
  label: { fontFamily: 'monospace', fontSize: 10, letterSpacing: 1, textTransform: 'uppercase' },
  title: { fontSize: 34, fontWeight: '600', letterSpacing: -1.5 },
});
